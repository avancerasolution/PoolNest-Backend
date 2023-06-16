const TrackError = require("../middleware/TrackError");
const { paginate } = require("../utils/paginate.prisma");
const pick = require("../utils/pick");
const prismaClient = require("../utils/prisma.client")


const getActiveWorkOrders = TrackError(async (req, res, next) => {
    const filters = pick(req.query, ["email", "name", "status", "ActiveWorkOrder_type", "company_name", "mobile_no_primary"])
    if (req.user.user_type !== "Client") {
        filters.admin_id = req.user.admin_id;
    }
    const options = pick(req.query, ["pageNumber", "limit", "sortByField", "sortOrder"])
    if (!options.sortBy) { options.sortBy = "active_work_order_id" }
    const result = await paginate("activeWorkOrder", filters, options, { Technician: true })
    res.status(200).send({ success: true, result });

})
const getActiveWorkOrder = TrackError(async (req, res, next) => {
    const id = req.params.id
    const result = await prismaClient.activeWorkOrder.findFirst({ where: { active_work_order_id: id }, include: { Technician: true, Customer: true, Waterbody: true, Work_order: true, Service_location: true } });
    if (!result) {
        return res.status(404).send({ success: false, message: "ActiveWorkOrder doesnt not exists" });
    }
    res.status(200).send({ success: true, result })
})


const createActiveWorkOrder = TrackError(async (req, res, next) => {
    if (await emailExist(req.body.email)) {
        return res.status(400).send({ success: false, message: "ActiveWorkOrder with this email already exists" })
    }
    req.body.admin_id = req.user.admin_id;
    const result = await prismaClient.activeWorkOrder.create({ data: req.body, })
    res.status(201).send({ success: true, result })
})

const deleteActiveWorkOrderByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.activeWorkOrder.delete({ where: { active_work_order_id: id } })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || error.message.includes("record to delete does not exist")) {
            return res.status(404).send({ success: false, message: "record does not exists" })
        }
        res.status(400).send({ success: false, message: e })
    }

})

const deleteAllActiveWorkOrders = TrackError(async (req, res, next) => {
    const id = req.params.id;
    const result = await prismaClient.activeWorkOrder.deleteMany()
    res.status(200).send(result)
})


const updateActiveWorkOrderByID = TrackError(async (req, res, next) => {
    try {
        if (req.body.email) {
            if (await emailExist(req.body.email)) {
                return res.status(400).send({ success: false, message: "active work order with this email already exists" })
            }
        }
        const id = req.params.id
        const result = await prismaClient.activeWorkOrder.update({ where: { active_work_order_id: id }, data: req.body })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to update does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})

module.exports = { getActiveWorkOrders, createActiveWorkOrder, deleteActiveWorkOrderByID, getActiveWorkOrder, updateActiveWorkOrderByID, deleteAllActiveWorkOrders }