const TrackError = require("../middleware/TrackError");
const { paginate } = require("../utils/paginate.prisma");
const pick = require("../utils/pick");
const prismaClient = require("../utils/prisma.client")


const getServiceChecklists = TrackError(async (req, res, next) => {
    const filters = pick(req.query, ["name", "description"])
    if (req.user.user_type !== "Client") {
        filters.admin_id = req.user.admin_id;
    }
    const options = pick(req.query, ["pageNumber", "limit", "sortByField", "sortOrder"])
    if (!options.sortBy) { options.sortBy = "service_checklist_id" }
    const result = await paginate("serviceChecklist", filters, options)
    res.status(200).send({ success: true, result });

})

const getServiceChecklist = TrackError(async (req, res, next) => {
    const id = req.params.id
    const result = await prismaClient.serviceChecklist.findFirst({ where: { service_checklist_id: id } });
    if (!result) {
        return res.status(404).send({ success: false, message: "checklist item doesnt not exists" });
    }
    res.status(200).send({ success: true, result })
})


const createServiceChecklist = TrackError(async (req, res, next) => {
    req.body.admin_id = req.user.admin_id;
    const result = await prismaClient.serviceChecklist.create({ data: req.body, })
    res.status(201).send({ success: true, result })
})

const createServiceChecklists = TrackError(async (req, res, next) => {
    let body = req.body.map((item) => {
        return { ...item, admin_id: req.user.admin_id }
    })
    const result = await prismaClient.serviceChecklist.createMany({ data: body })
    res.status(201).send({ success: true, result })
})


const deleteServiceChecklistByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.serviceChecklist.delete({ where: { service_checklist_id: id } })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to delete does not exist")) {
            return res.status(404).send({ success: false, message: "record doesnt exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }

})

const deleteAllServiceChecklists = TrackError(async (req, res, next) => {
    const id = req.params.id
    const result = await prismaClient.serviceChecklist.deleteMany()
    res.status(200).send(result)
})


const updateServiceChecklistByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.serviceChecklist.update({ where: { service_checklist_id: id }, data: req.body })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("record to update does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})




module.exports = { getServiceChecklists, createServiceChecklist, deleteServiceChecklistByID, getServiceChecklist, updateServiceChecklistByID, deleteAllServiceChecklists, createServiceChecklists }