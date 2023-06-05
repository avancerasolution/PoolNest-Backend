const TrackError = require("../middleware/TrackError");
const { paginate } = require("../utils/paginate.prisma");
const pick = require("../utils/pick");
const prismaClient = require("../utils/prisma.client")


const getServices = TrackError(async (req, res, next) => {
    const filters = pick(req.query, ["email", "name",])
    if (req.user.user_type !== "Client") {
        filters.admin_id = req.user.admin_id;
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


const createService = TrackError(async (req, res, next) => {
    console.log(req.body)
    req.body.admin_id = req.user.admin_id;



    const result = await prismaClient.service.create({ data: req.body, })
    res.status(201).send({ success: true, result })
})



const deleteServiceByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.service.delete({ where: { service_id: id } })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || error.message.includes("record to delete does not exist")) {
            return res.status(404).send({ success: false, message: "record does not exists" })
        }
        res.status(400).send({ success: false, message: e })
    }

})



const deleteAllServices = TrackError(async (req, res, next) => {
    const id = req.params.id;
    const result = await prismaClient.service.deleteMany()
    res.status(200).send(result)
})


const updateServiceByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.service.update({ where: { service_id: id }, data: req.body })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to update does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})

module.exports = { getService, createService, deleteServiceByID, getServices, updateServiceByID, deleteAllServices }