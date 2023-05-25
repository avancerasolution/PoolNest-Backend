const TrackError = require("../middleware/TrackError");
const { paginate } = require("../utils/paginate.prisma");
const pick = require("../utils/pick");
const prismaClient = require("../utils/prisma.client")


const getDosages = TrackError(async (req, res, next) => {
    const filters = pick(req.query, ["name", "description"])
    const options = pick(req.query, ["pageNumber", "limit", "sortByField", "sortOrder"])
    if (req.user.user_type !== "Client") {
        filters.admin_id = req.user.admin_id;
    }
    if (!options.sortBy) { options.sortBy = "dosage_id" }
    const result = await paginate("dosage", filters, options)
    res.status(200).send({ success: true, result });

})

const getDosage = TrackError(async (req, res, next) => {
    const id = req.params.id
    const result = await prismaClient.dosage.findFirst({ where: { dosage_id: id } });
    if (!result) {
        return res.status(404).send({ success: false, message: "Dosage doesnt not exists" });
    }
    res.status(200).send({ success: true, result })
})


const createDosage = TrackError(async (req, res, next) => {
    req.body.admin_id = req.user.admin_id;
    const result = await prismaClient.dosage.create({ data: req.body, })
    res.status(201).send({ success: true, result })
})

const deleteDosageByID = TrackError(async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const result = await prismaClient.dosage.delete({ where: { dosage_id: id } })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to delete does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }

})

const deleteAllDosages = TrackError(async (req, res, next) => {
    const id = req.params.id
    const result = await prismaClient.dosage.deleteMany()
    res.status(200).send(result)
})


const updateDosageByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.dosage.update({ where: { dosage_id: id }, data: req.body })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to update does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})


module.exports = { getDosages, createDosage, deleteDosageByID, getDosage, updateDosageByID, deleteAllDosages }