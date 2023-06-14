const cron = require('node-cron');
const prismaClient = require('../utils/prisma.client');
const { getWeeksInRange, addDays, getNumberForFrequency } = require('../services/helperFunctions');


const monthlyActiveServiceCreator = async () => {
    const task = cron.schedule("0 0 1 * *", async () => {
        let activeServiceBatch = [];
        const currentMonth = new Date()
        var lastDateOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
        const services = await prismaClient.service.findMany({ where: { status: "active", stop_date: { gte: currentMonth } } })
        lastDateOfMonth.setHours(5, 0, 0, 0) // adjust for timezone
        console.log(lastDateOfMonth, "<==== wow")
        console.log(services, "<=== wow")
        services.forEach(async (service, index) => {
            console.log("#####################################################################")
            console.log("for " + index + " service")
            console.log("#####################################################################")
            //SETTING NUMBER OF WEEKS FOR A SINGLE SERVICE
            let numberOfWeeks = 0;
            if (service.stop_date !== "NO_END") { // if the end_date has a date 
                numberOfWeeks = getWeeksInRange(currentMonth, service.stop_date < lastDateOfMonth ? req.body.stop_date : lastDateOfMonth)// Our stop date is smaller than last day of the current month then stop date is selected or else lastdate of the current month is selected
            }
            else {
                numberOfWeeks = getWeeksInRange(currentMonth, lastDateOfMonth)// Our stop date is smaller than last day of the current month then stop date is selected or else lastdate of the current month is selected
            }
            //SETTING NUMBER OF FREQUENCY
            var numberOfService = getNumberForFrequency(service.frequency);
            console.log(numberOfWeeks, "no of weeks") // we get number of weeks that we can add to the current month , now we need to add services wrt to selected day and date
            console.log(getNumberForFrequency(service.frequency), "<====== freq") // number of times we need to add service in each month
            if (getNumberForFrequency(service.frequency) > numberOfWeeks) {//if the number of weeks we have is leess than frequency than the service will be created on every remaining week of the month
                numberOfService = numberOfWeeks;
            }
            let increment = 0;
            console.log(numberOfService, "<==== final number of service to be created")
            // CREATING OBJECTS TO BE PUSHED INTO THE ACTIVE SERVICE BATCH
            for (let index = 0; index < numberOfService; index++) {
                console.log("i ran", index)
                const obj = {
                    ...service,
                    service_id: service.service_id,
                    assigned_date: addDays(currentMonth, numberOfService == 2 ? increment * 2 : increment),
                    rate: service.rate,
                    labor_cost: service.labor_cost,
                    labor_cost_type: service.labor_cost_type,
                    minutes_per_stop: service.minutes_per_stop
                };
                increment = increment + 7;
                activeServiceBatch.push(obj)
            }
            // console.log(data, "<=== data")
            // activeServiceBatch = [...activeServiceBatch, ...data]
            // const activeServices = await prisma.activeService.createMany({ data: data })

        })
        console.log(activeServiceBatch, "<,===== fainal")


    }, { scheduled: true, timezone: "America/New_York" })
    task.start();

}


module.exports = { monthlyActiveServiceCreator }