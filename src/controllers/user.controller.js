const TrackError = require("../middleware/TrackError");
const { emailExist, usernameExist } = require("../services/user.services");
const prismaClient = require("../utils/prisma.client")


const getUsers = async (req, res, next) => {
    const result = await prismaClient.user.findMany()
    res.status(200).send({ success: true, result });

}

const getUser = TrackError(async (req, res, next) => {
    const id = parseInt(req.params.id)
    const result = await prismaClient.user.findFirst({ where: { id: id }, include: { admin: true } });
    if (!result) {
        return res.status(404).send("no user found");
    }
    res.status(200).send(result)
})


const createUser = TrackError(async (req, res, next) => {
    if (await emailExist(req.body.email) || await usernameExist(req.body.username)) {
        return res.status(400).send("email or username already exists")
    }
    const result = await prismaClient.user.create({ data: req.body, })
    res.status(201).send({ success: true, result })
})

const deleteUserByID = TrackError(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const result = await prismaClient.user.delete({ where: { id: id } })
    res.status(200).send(result)
})

const deleteAllUsers = TrackError(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const result = await prismaClient.user.deleteMany()
    res.status(200).send(result)
})


const updateUserByID = TrackError(async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const result = await prismaClient.user.update({ where: { id: id }, data: req.body })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || error.message.includes("Record to update does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})


module.exports = { getUsers, createUser, deleteUserByID, getUser, updateUserByID, deleteAllUsers }