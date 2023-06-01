const TrackError = require("../middleware/TrackError");
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
    const result = await paginate("workOrder", filters, options)
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
    try {
        const id = req.params.id
        const result = await prismaClient.workOrder.update({ where: { work_order_id: id }, data: req.body })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to update does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})


module.exports = { getWorkOrders, createWorkOrder, deleteWorkOrderByID, getWorkOrder, updateWorkOrderByID, deleteAllWorkOrders }