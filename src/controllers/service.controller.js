const httpStatus = require("http-status");
const TrackError = require("../middleware/TrackError");
const { getWeeksInRange, getNumberForFrequency, addDays } = require("../services/helperFunctions");
const { paginate } = require("../utils/paginate.prisma");
const pick = require("../utils/pick");
const prismaClient = require("../utils/prisma.client")


const getServices = TrackError(async (req, res, next) => {
    const filters = pick(req.query, ["email", "name",])
    if (req.user.user_type !== "Client") {
        filters.admin_id = req.user.admin_id;
        filters.deletedAt = null;
    }
    const options = pick(req.query, ["pageNumber", "limit", "sortByField", "sortOrder"])
    if (!options.sortBy) { options.sortBy = "service_id" }
    const result = await paginate("service", filters, options)
    res.status(200).send({ success: true, result });

})
const getService = TrackError(async (req, res, next) => {
    const id = req.params.id
    const result = await prismaClient.service.findFirst({ where: { service_id: id } });
    if (!result) {
        return res.status(404).send({ success: false, message: "service doesnt not exists" });
    }
    res.status(200).send({ success: true, result })
})


//whenever a service is created this popualtes the active service by entries of for the current running work.
const createService = TrackError(async (req, res, next) => {
    await prismaClient.$transaction(async (prisma) => {
        const serviceLocation = await prisma.serviceLocation.findFirst({ where: { service_location_id: req.body.service_location_id } })
        if (!serviceLocation) {
            return res.status(httpStatus.BAD_REQUEST).send({ success: false, message: "serviceLocation doesnt exists" })
        }
        if (req.body.start_date < Date.now()) {
            return res.status(400).send({ success: false, message: "invalid start_date" })
        }
        try {
            req.body.price
            req.body.admin_id = req.user.admin_id;
            const result = await prisma.service.create({ data: req.body, })
            const data = []
            console.log(req.body, "<=== body")
            if (req.body.start_date > req.body.stop_date || getWeeksInRange(req.body.start_date, req.body.stop_date) < 1) {
                return res.status(400).send({ success: false, message: "invalid dates" })
            }
            req.body.admin_id = req.user.admin_id;
            let currentDate = new Date()
            // change according to tiemzone
            req.body.start_date.setHours(1, 0, 0, 0)
            if (req.body.stop_date != "NO_END") {
                req.body.stop_date.setHours(1, 0, 0, 0)
            }
            // ########################################
            console.log(req.body.start_date, "<==== start date")
            console.log(req.body.stop_date, "<==== stop date")
            currentDate.setHours(0, 0, 0, 0)
            console.log(currentDate, "<==current")
            var lastDateOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1) // get last day of the current month
            lastDateOfMonth.setHours(0, 0, 0, 0)    // set hours to starting point
            console.log(lastDateOfMonth, "<=== last date of month")
            if (req.body.start_date > lastDateOfMonth) { // if the start date goes in the next month it will be handled then by the cron job
                return res.status(200).send({ success: true, result: { message: "no service created for this month" } })
            }
            let numberOfWeeks = 0;
            if (req.body.stop_date !== "NO_END") { // if the end_date has a date 
                numberOfWeeks = getWeeksInRange(req.body.start_date, req.body.stop_date < lastDateOfMonth ? req.body.stop_date : lastDateOfMonth)// Our stop date is smaller than last day of the current month then stop date is selected or else lastdate of the current month is selected
            }
            else {
                console.log("i ran wo wow owow")
                console.log(lastDateOfMonth, "<== =last date of month")
                numberOfWeeks = getWeeksInRange(req.body.start_date, lastDateOfMonth)// Our stop date is smaller than last day of the current month then stop date is selected or else lastdate of the current month is selected
            }
            var numberOfService = getNumberForFrequency(req.body.frequency);
            console.log(numberOfWeeks, "no of weeks") // we get number of weeks that we can add to the current month , now we need to add services wrt to selected day and date
            console.log(getNumberForFrequency(req.body.frequency), "<====== freq") // number of times we need to add service in each month
            if (getNumberForFrequency(req.body.frequency) > numberOfWeeks) {//if the number of weeks we have is leess than frequency than the service will be created on every remaining week of the month
                numberOfService = numberOfWeeks;
            }
            let increment = 0;
            console.log(numberOfService, "<==== final number of service to be created")
            for (let index = 0; index < numberOfService; index++) {
                console.log("i ran", index)
                const service = {
                    ...req.body,
                    service_id: result.service_id,
                    assigned_date: addDays(req.body.start_date, numberOfService == 2 ? increment * 2 : increment),
                    rate: req.body.rate,
                    labor_cost: req.body.labor_cost,
                    labor_cost_type: req.body.labor_cost_type,
                    minutes_per_stop: req.body.minutes_per_stop
                };
                increment = increment + 7;
                data.push(service)
            }
            console.log(data, "<=== data")
            const activeServices = await prisma.activeService.createMany({ data: data })
            res.status(201).send({ success: true, result: activeServices })
        } catch (e) {
            console.error(e);
            res.status(400).send({ success: false, message: "unable to handle service creation, please recheck details and try again " })
        }
    })
})




// const wow = async () => {
//     await prismaClient.activeService.deleteMany()
// }

// wow()



const deleteServiceByID = TrackError(async (req, res, next) => {
    const id = req.params.id
    await prismaClient.$transaction(async (prisma) => {
        try {
            const activeService = await prisma.activeService.deleteMany({ where: { service_id: id, assigned_date: { gte: new Date() } } })
            const result = await prisma.service.delete({ where: { service_id: id } })
            return res.status(200).send(result)


        } catch (e) {
            if (e.code === "P2025" || e.message.includes("record to delete does not exist")) {
                return res.status(404).send({ success: false, message: "record does not exists" })
            }
            try {
                const result = await prismaClient.service.update({ where: { service_id: id }, data: { deletedAt: new Date() } })
            } catch (e) {
                console.log(e)
            }
            return res.status(400).send({ success: false, message: e.message })
        }
    })


})



const deleteAllServices = TrackError(async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await prismaClient.service.deleteMany()
        res.status(200).send(result)
    } catch (e) { }
})


const updateServiceByID = TrackError(async (req, res, next) => {
    await prismaClient.$transaction(async (prisma) => {
        try {
            const currentDate = new Date();
            const id = req.params.id
            const result = await prisma.service.update({ where: { service_id: id }, data: req.body })
            const activeServiceResult = await prisma.activeService.updateMany(
                {
                    where: {
                        service_id: id,
                        assigned_date: { gte: currentDate, lte: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1) }
                    },
                    data: req.body
                });
            console.log(activeServiceResult, "<=====")
            res.status(200).send(result)
        } catch (e) {
            console.log(e, "<== ee")
            if (e.code === "P2025" || e.message.includes("Record to update does not exist")) {
                return res.status(404).send({ success: false, message: "record  not exists" })
            }
            res.status(400).send({ success: false, message: e.message })
        }
    })

})

module.exports = { getService, createService, deleteServiceByID, getServices, updateServiceByID, deleteAllServices }