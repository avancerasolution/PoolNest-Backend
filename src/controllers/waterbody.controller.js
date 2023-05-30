const TrackError = require("../middleware/TrackError");
const { paginate } = require("../utils/paginate.prisma");
const pick = require("../utils/pick");
const prismaClient = require("../utils/prisma.client")


const getWaterbodies = TrackError(async (req, res, next) => {
    const filters = pick(req.query, ["color_code", "name",])
    if (req.user.user_type !== "Client") {
        filters.admin_id = req.user.admin_id;
    }
    const options = pick(req.query, ["pageNumber", "limit", "sortByField", "sortOrder"])
    if (!options.sortBy) { options.sortBy = "work_order_type_id" }
    const result = await paginate("waterbody", filters, options)
    res.status(200).send({ success: true, result });


})

const getWaterbody = TrackError(async (req, res, next) => {
    const id = req.params.id;
    const result = await prismaClient.waterbody.findFirst({ where: { waterbody_id: id } });
    if (!result) {
        return res.status(404).send({ success: false, message: "Waterboody doesnt not exists" });
    }
    res.status(200).send({ success: true, result })
})


const createWaterbody = TrackError(async (req, res, next) => {
    const result = await prismaClient.waterbody.create({ data: req.body, })
    res.status(201).send({ success: true, result })
})

const deleteWaterbodyByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.waterbody.delete({ where: { work_order_type_id: id } })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to delete does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }

})

const deleteAllWaterbodys = TrackError(async (req, res, next) => {
    const result = await prismaClient.waterbody.deleteMany()
    res.status(200).send(result)
})

const updateWaterbodyByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.waterbody.update({ where: { waterbody_id: id }, data: req.body })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to update does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})


module.exports = { getWaterbodies, createWaterbody, deleteWaterbodyByID, getWaterbody, updateWaterbodyByID, deleteAllWaterbodys }