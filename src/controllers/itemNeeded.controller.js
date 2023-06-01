const TrackError = require("../middleware/TrackError");
const { paginate } = require("../utils/paginate.prisma");
const pick = require("../utils/pick");
const prismaClient = require("../utils/prisma.client")


const getItemsNeeded = TrackError(async (req, res, next) => {
    const filters = pick(req.query, ["name", "description"])
    if (req.user.user_type !== "Client") {
        filters.admin_id = req.user.admin_id;
    }
    const options = pick(req.query, ["pageNumber", "limit", "sortByField", "sortOrder"])
    if (!options.sortBy) { options.sortBy = "item_needed_id" }
    const result = await paginate("itemNeeded", filters, options)
    res.status(200).send({ success: true, result });

})

const getItemNeeded = TrackError(async (req, res, next) => {
    const id = req.params.id
    const result = await prismaClient.itemNeeded.findFirst({ where: { item_needed_id: id } });
    if (!result) {
        return res.status(404).send({ success: false, message: "ItemsNeeded doesnt not exists" });
    }
    res.status(200).send({ success: true, result })
})


const createItemNeeded = TrackError(async (req, res, next) => {
    req.body.admin_id = req.user.admin_id;
    const result = await prismaClient.itemNeeded.create({ data: req.body, })
    res.status(201).send({ success: true, result })
})


const createItemsNeeded = TrackError(async (req, res, next) => {
    let body = req.body.map((item) => {
        return { ...item, admin_id: req.user.admin_id }
    })
    const result = await prismaClient.itemNeeded.createMany({ data: body })
    res.status(201).send({ success: true, result })
})


const deleteItemsNeededByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.itemNeeded.delete({ where: { item_needed_id: id } })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to delete does not exist")) {
            return res.status(404).send({ success: false, message: "record doesnt exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }

})

const deleteAllItemsNeeded = TrackError(async (req, res, next) => {
    const id = req.params.id
    const result = await prismaClient.itemNeeded.deleteMany()
    res.status(200).send(result)
})



const updateItemNeededByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.itemNeeded.update({ where: { item_needed_id: id }, data: req.body })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to update does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})

module.exports = { getItemNeeded, createItemNeeded, deleteItemsNeededByID, getItemsNeeded, updateItemNeededByID, deleteAllItemsNeeded, createItemsNeeded }