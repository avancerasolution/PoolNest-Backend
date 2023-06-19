const TrackError = require("../middleware/TrackError");
const { sendSimpleMessage } = require("../services/sendGridMessaging.service");
const { paginate } = require("../utils/paginate.prisma");
const pick = require("../utils/pick");
const prismaClient = require("../utils/prisma.client")


const getWorkOrders = TrackError(async (req, res, next) => {
    const filters = pick(req.query, ["color_code", "name",])
    if (req.user.user_type !== "Client") {
        filters.admin_id = req.user.admin_id;
    }
    const options = pick(req.query, ["pageNumber", "limit", "sortByField", "sortOrder"])
    if (!options.sortBy) { options.sortBy = "work_order_id" }
    const result = await paginate("workOrder", filters, options, { Work_order_type: true, Technician: true })
    res.status(200).send({ success: true, result });


})

const getWorkOrder = TrackError(async (req, res, next) => {
    const id = req.params.id;
    const result = await prismaClient.workOrder.findFirst({ where: { work_order_id: id } });
    if (!result) {
        return res.status(404).send({ success: false, message: "Work Order doesnt not exists" });
    }
    res.status(200).send({ success: true, result })
})


const createWorkOrder = TrackError(async (req, res, next) => {
    req.body.admin_id = req.user.admin_id;
    const result = await prismaClient.workOrder.create({ data: req.body, })
    res.status(201).send({ success: true, result })
})

const deleteWorkOrderByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.workOrder.delete({ where: { work_order_id: id } })
        return res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to delete does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        return res.status(400).send({ success: false, message: e.message })
    }

})

const deleteAllWorkOrders = TrackError(async (req, res, next) => {
    const result = await prismaClient.workOrder.deleteMany()
    res.status(200).send(result)
})


const updateWorkOrderByID = TrackError(async (req, res, next) => {
    await prismaClient.$transaction(async (prisma) => {
        try {
            const id = req.params.id
            const result = await prisma.workOrder.update({ where: { work_order_id: id }, data: req.body })
            res.status(200).send({ success: false, result: result })
        } catch (e) {
            console.error(e)
            if (e.code === "P2025" || e.message.includes("Record to update does not exist")) {
                return res.status(404).send({ success: false, message: "record  not exists" })
            }
            res.status(400).send({ success: false, message: e.message })
        }
    })

})

const completeWorkOrderByID = TrackError(async (req, res, next) => {
    await prismaClient.$transaction(async (prisma) => {
        try {
            const id = req.params.id
            const result = await prisma.workOrder.update({ where: { work_order_id: id }, data: { service_date: req.body.service_date } })
            // console.log(result, "<==== result")
            if (req.body.service_date) {
                const creatingAnEntryToActiveOrder = await prisma.activeWorkOrder.create(
                    {
                        data: {
                            admin_id: result.admin_id,
                            work_order_id: result.work_order_id,
                            technician_id: result.technician_id,
                            waterbody_id: result.waterbody_id,
                            service_location_id: result.service_location_id,
                            work_order_type_id: result.work_order_type_id,
                            customer_id: result.customer_id,
                            service_date: result.service_date,
                            estimated_time_minutes: result.estimated_time_minutes,
                            labor_cost: result.labor_cost,
                            price: result.price,
                            media: req.files.length !== 0 ? req.files.map((file) => file.filename) : [], work_order_id: result.work_order_id,
                            status: req.body.status === "completed" ? "completed" : null,
                            description: req.body.description
                        }
                    })
                console.log(creatingAnEntryToActiveOrder, "<--- wow")
            }
            // const entryToActiveWorkOrder = await prisma.activeWorkOrder.create({ data: {} })
            res.status(200).send(result)
        } catch (e) {
            console.error(e)
            if (e.code === "P2025" || e.message.includes("Record to update does not exist")) {
                return res.status(404).send({ success: false, message: "record  not exists" })
            }
            res.status(400).send({ success: false, message: e.message })
        }
    })
})

//farz field  service_date,description,media,

// sendSimpleMessage({ subject: "wow", text: "wow", to: "bilal.aleem09@gmail.com", from: "bilal.aleem@avancerasolutions.com" })


module.exports = { getWorkOrders, createWorkOrder, deleteWorkOrderByID, getWorkOrder, updateWorkOrderByID, deleteAllWorkOrders, completeWorkOrderByID }