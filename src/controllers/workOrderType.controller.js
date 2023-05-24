const TrackError = require("../middleware/TrackError");
const prismaClient = require("../utils/prisma.client")


const getWorkOrderTypes = TrackError(async (req, res, next) => {
    const result = await prismaClient.workOrderType.findMany()
    res.status(200).send({ success: true, result });

})

const getWorkOrderType = TrackError(async (req, res, next) => {
    const id = parseInt(req.params.id)
    const result = await prismaClient.workOrderType.findFirst({ where: { work_order_type_id: id } });
    if (!result) {
        return res.status(404).send({ success: false, message: "Work Order Type doesnt not exists" });
    }
    res.status(200).send({ success: true, result })
})


const createWorkOrderType = TrackError(async (req, res, next) => {
    const result = await prismaClient.workOrderType.create({ data: req.body, })
    res.status(201).send({ success: true, result })
})

const deleteWorkOrderTypeByID = TrackError(async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const result = await prismaClient.workOrderType.delete({ where: { work_order_type_id: id } })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || error.message.includes("Record to delete does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }

})

const deleteAllWorkOrderTypes = TrackError(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const result = await prismaClient.workOrderType.deleteMany()
    res.status(200).send(result)
})


const updateWorkOrderTypeByID = TrackError(async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const result = await prismaClient.workOrderType.update({ where: { work_order_type_id: id }, data: req.body })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || error.message.includes("Record to update does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})


module.exports = { getWorkOrderTypes, createWorkOrderType, deleteWorkOrderTypeByID, getWorkOrderType, updateWorkOrderTypeByID, deleteAllWorkOrderTypes }