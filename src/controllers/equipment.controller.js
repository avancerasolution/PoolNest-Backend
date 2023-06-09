const TrackError = require("../middleware/TrackError");
const { paginate } = require("../utils/paginate.prisma");
const pick = require("../utils/pick");
const prismaClient = require("../utils/prisma.client")


const getEquipments = TrackError(async (req, res, next) => {
    const filters = pick(req.query, ["name", "description"])
    if (req.user.user_type !== "Client") {
        filters.admin_id = req.user.admin_id;
    }
    const options = pick(req.query, ["pageNumber", "limit", "sortByField", "sortOrder"])
    if (!options.sortBy) { options.sortBy = "equipment_id" }
    const result = await paginate("equipment", filters, options)
    res.status(200).send({ success: true, result });

})

const getEquipment = TrackError(async (req, res, next) => {
    const id = req.params.id
    const result = await prismaClient.equipment.findFirst({ where: { equipment_id: id } });
    if (!result) {
        return res.status(404).send({ success: false, message: "equipment doesnt not exists" });
    }
    res.status(200).send({ success: true, result })
})


const createEquipment = TrackError(async (req, res, next) => {
    req.body.admin_id = req.user.admin_id;
    const result = await prismaClient.equipment.create({ data: req.body, })
    res.status(201).send({ success: true, result })
})

const createEquipments = TrackError(async (req, res, next) => {
    let body = req.body.map((item) => {
        return { ...item, admin_id: req.user.admin_id }
    })
    const result = await prismaClient.equipment.createMany({ data: body })
    res.status(201).send({ success: true, result })
})

const deleteEquipmentByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.equipment.delete({ where: { equipment_id: id } })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to delete does not exist")) {
            return res.status(404).send({ success: false, message: "record doesnt exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }

})

const deleteAllEquipments = TrackError(async (req, res, next) => {
    const id = req.params.id
    const result = await prismaClient.equipment.deleteMany()
    res.status(200).send(result)
})


const updateEquipmentByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.equipment.update({ where: { equipment_id: id }, data: req.body })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to update does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})

module.exports = { getEquipments, createEquipment, deleteEquipmentByID, getEquipment, updateEquipmentByID, deleteAllEquipments, createEquipments }