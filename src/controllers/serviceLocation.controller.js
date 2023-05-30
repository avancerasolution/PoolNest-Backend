const TrackError = require("../middleware/TrackError");
const { paginate } = require("../utils/paginate.prisma");
const pick = require("../utils/pick");
const prismaClient = require("../utils/prisma.client")


const getServiceLocations = TrackError(async (req, res, next) => {
    const filters = pick(req.query, ["color_code", "name",])
    if (req.user.user_type !== "Client") {
        filters.admin_id = req.user.admin_id;
    }
    const options = pick(req.query, ["pageNumber", "limit", "sortByField", "sortOrder"])
    if (!options.sortBy) { options.sortBy = "service_location_id" }
    const result = await paginate("serviceLocation", filters, options)
    res.status(200).send({ success: true, result });


})


const getServiceLocation = TrackError(async (req, res, next) => {
    const id = req.params.id;
    const result = await prismaClient.serviceLocation.findFirst({ where: { service_location_id: id } });
    if (!result) {
        return res.status(404).send({ success: false, message: "service location doesnt not exists" });
    }
    res.status(200).send({ success: true, result })
})


const createServiceLocation = TrackError(async (req, res, next) => {
    req.body.admin_id = req.user.admin_id;
    const result = await prismaClient.serviceLocation.create({ data: req.body, })
    res.status(201).send({ success: true, result })
})

const deleteServiceLocationByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.serviceLocation.delete({ where: { service_location_id: id } })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to delete does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }

})

const deleteAllServiceLocations = TrackError(async (req, res, next) => {
    const result = await prismaClient.serviceLocation.deleteMany()
    res.status(200).send(result)
})

const updateServiceLocationByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.serviceLocation.update({ where: { service_location_id: id }, data: req.body })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to update does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})


module.exports = { getServiceLocations, createServiceLocation, deleteServiceLocationByID, getServiceLocation, updateServiceLocationByID, deleteAllServiceLocations }