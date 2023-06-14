const TrackError = require("../middleware/TrackError");
const { paginate } = require("../utils/paginate.prisma");
const pick = require("../utils/pick");
const prismaClient = require("../utils/prisma.client")


const getTags = TrackError(async (req, res, next) => {
    console.log(req.query, "<query")
    const filters = pick(req.query, ["name", "description", "active_service_id"])
    const options = pick(req.query, ["pageNumber", "limit", "sortByField", "sortOrder"])
    if (req.user.user_type !== "Client") {
        filters.admin_id = req.user.admin_id;
    }
    if (!options.sortBy) { options.sortBy = "tag_id" }
    console.log(filters, "<=== fitlers")
    console.log(options, "<=== options")
    const result = await paginate("tags", filters, options)
    res.status(200).send({ success: true, result });

})

const getTag = TrackError(async (req, res, next) => {
    const id = req.params.id
    const result = await prismaClient.tags.findFirst({ where: { tag_id: id } });
    if (!result) {
        return res.status(404).send({ success: false, message: "Tag doesnt not exists" });
    }
    res.status(200).send({ success: true, result })
})


const createTag = TrackError(async (req, res, next) => {
    req.body.admin_id = req.user.admin_id;
    const result = await prismaClient.tags.create({ data: req.body, })
    res.status(201).send({ success: true, result })
})

const createTags = TrackError(async (req, res, next) => {
    let body = req.body.map((item) => {
        return { ...item, admin_id: req.user.admin_id }
    })
    const result = await prismaClient.tags.createMany({ data: body })
    res.status(201).send({ success: true, result })
})

const deleteTagByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.tags.delete({ where: { tag_id: id } })
        res.status(200).send(result)
    } catch (e) {
        console.log(e)
        if (e.code === "P2025" || e.message.includes("Record to delete does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }

})

const deleteAllTags = TrackError(async (req, res, next) => {
    const id = req.params.id
    const result = await prismaClient.tags.deleteMany()
    res.status(200).send(result)
})


// const wow = async () => {
//     const result = await prismaClient.tags.deleteMany()
// }

// wow()

const updateTagByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.tags.update({ where: { tag_id: id }, data: req.body })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to update does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})


module.exports = { getTags, createTag, deleteTagByID, getTag, updateTagByID, deleteAllTags, createTags }