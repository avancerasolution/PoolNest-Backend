const TrackError = require("../middleware/TrackError");
const { paginate } = require("../utils/paginate.prisma");
const pick = require("../utils/pick");
const prismaClient = require("../utils/prisma.client")


const getReadings = TrackError(async (req, res, next) => {
    const filters = pick(req.query, ["name", "description"])
    if (req.user.user_type !== "Client") {
        filters.admin_id = req.user.admin_id;
    }
    const options = pick(req.query, ["pageNumber", "limit", "sortByField", "sortOrder"])
    if (!options.sortBy) { options.sortBy = "reading_id" }
    const result = await paginate("reading", filters, options)
    res.status(200).send({ success: true, result });

})

const getReading = TrackError(async (req, res, next) => {
    const id = req.params.id
    const result = await prismaClient.reading.findFirst({ where: { reading_id: id } });
    if (!result) {
        return res.status(404).send({ success: false, message: "Reading doesnt not exists" });
    }
    res.status(200).send({ success: true, result })
})


const createReading = TrackError(async (req, res, next) => {
    req.body.admin_id = req.user.admin_id;
    const result = await prismaClient.reading.create({ data: req.body, })
    res.status(201).send({ success: true, result })
})

const deleteReadingByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.reading.delete({ where: { reading_id: id } })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to delete does not exist")) {
            return res.status(404).send({ success: false, message: "record doesnt exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }

})

const deleteAllReadings = TrackError(async (req, res, next) => {
    const id = req.params.id
    const result = await prismaClient.reading.deleteMany()
    res.status(200).send(result)
})


const updateReadingByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.reading.update({ where: { reading_id: id }, data: req.body })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to update does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})

module.exports = { getReadings, createReading, deleteReadingByID, getReading, updateReadingByID, deleteAllReadings }