const TrackError = require("../middleware/TrackError");
const { emailExist, usernameExist } = require("../services/user.services");
const { paginate } = require("../utils/paginate.prisma");
const pick = require("../utils/pick");
const prismaClient = require("../utils/prisma.client")
const bcrypt = require("bcrypt")


const getUsers = async (req, res, next) => {
    const filters = pick(req.query, ["email", "user_type", "color_code", "first_name", "last_name"])
    if (req.user.user_type !== "Client") {
        filters.admin_id = req.user.admin_id;
    }
    const options = pick(req.query, ["pageNumber", "limit", "sortByField", "sortOrder"])
    if (!options.sortBy) { options.sortBy = "id" }
    const result = await paginate("user", filters, options)
    res.status(200).send({ success: true, result });


}

const getUser = TrackError(async (req, res, next) => {
    const id = req.params.id;
    const result = await prismaClient.user.findFirst({ where: { id: id }, include: { admin: true } });
    if (!result) {
        return res.status(404).send("no user found");
    }
    res.status(200).send(result)
})



const createUser = TrackError(async (req, res, next) => {
    if (req.user.user_type !== "Client") {
        req.body.admin_id = req.user.admin_id
    }
    if (await emailExist(req.body.email) || await usernameExist(req.body.username)) {
        return res.status(400).send("email or username already exists")
    }
    req.body.password = await bcrypt.hash(req.body.password, 8)
    const result = await prismaClient.user.create({ data: req.body, })

    if (result.user_type = "SuperAdmin" && !result.admin_id) {
        await prismaClient.user.update({ where: { id: result.id }, data: { admin_id: result.id } })
    }
    res.status(201).send({ success: true, result })
})

const deleteUserByID = TrackError(async (req, res, next) => {
    try {
        const result = await prismaClient.user.delete({ where: { id: req.params.id } })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to delete does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})

const deleteAllUsers = TrackError(async (req, res, next) => {
    const result = await prismaClient.user.deleteMany()
    res.status(200).send(result)
})


const updateUserByID = TrackError(async (req, res, next) => {
    try {
        if (req.body.username) {
            if (await usernameExist(req.body.username)) {
                return res.status(400).send("username already exists")
            }
        }
        if (req.body.email) {
            if (await emailExist(req.body.email)) {
                return res.status(400).send("email already exists")
            }
        }
        const id = req.params.id
        const result = await prismaClient.user.update({ where: { id: id }, data: req.body })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to update does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})


module.exports = { getUsers, createUser, deleteUserByID, getUser, updateUserByID, deleteAllUsers }