const httpStatus = require("http-status");
const TrackError = require("../middleware/TrackError");
const { paginate } = require("../utils/paginate.prisma");
const pick = require("../utils/pick");
const prismaClient = require("../utils/prisma.client")
const bcrypt = require("bcrypt");
const { Prisma } = require("@prisma/client");
const { getDetailsAndSendMessage } = require("../services/sendGridMessaging.service");


const getEmailDetails = async (req, res, next) => {
    const filters = pick(req.query, ["email", "color_code", "first_name", "last_name"])
    if (req.user.user_type !== "Client") {
        filters.admin_id = req.user.admin_id;
    }
    const options = pick(req.query, ["pageNumber", "limit", "sortByField", "sortOrder"])
    if (!options.sortBy) { options.sortBy = "email_detail_id" }
    const result = await paginate("emailDetail", filters, options)
    res.status(200).send({ success: true, result });


}
//tech,customer,email details
// what i have , actvie service ,admin_id, and  
const getEmailDetail = TrackError(async (req, res, next) => {
    const id = req.params.id;
    // const result = await prismaClient.emailDetail.findFirst({ where: { email_detail_id: id }, include: { Admin: true } });
    // if (!result) {
    //     return res.status(404).send({ success: false, message: "no email details foundF" });
    // }
    // res.status(200).send(result)
    const activeService = await prismaClient.activeService.findUnique({ where: { active_service_id: id }, include: { Customer: true, Technician: true } })
    if (!activeService) return res.status(400).send({ success: false, message: "invalid active service id" })
    const emailDetails = await prismaClient.emailDetail.findFirst({ where: { admin_id: req.user.admin_id } });
    console.log(emailDetails, "<=== email")
    console.log(req.user, "user")
    console.log(activeService, "<=== as")
    if (!emailDetails) { return res.status(400).send({ success: false, message: "Invalid email details" }) }
    const result = getDetailsAndSendMessage(activeService.Technician, activeService.Customer, emailDetails);

    res.send("wow")
})



const createEmailDetail = TrackError(async (req, res, next) => {
    try {
        if (req.file) {
            req.body.logo = req.file.filename;
        }
        req.body.admin_id = req.user.admin_id;
        const result = await prismaClient.emailDetail.create({ data: req.body, })
        res.status(201).send({ success: true, result })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
            console.error('Unique constraint violation error:', e.meta);
            return res.status(400).send({ success: false, message: "email already exists" })
        } else {
            console.error('Unique constraint violation error:', e.meta);
            return res.status(400).send({ success: false, message: "something went wrong , oop!" })
        }
    }

})

const deleteEmailDetailByID = TrackError(async (req, res, next) => {
    try {
        const result = await prismaClient.emailDetail.delete({ where: { email_detail_id: req.params.id } })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to delete does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})

const deleteAllEmailDetails = TrackError(async (req, res, next) => {
    const result = await prismaClient.emailDetail.deleteMany()
    res.status(200).send(result)
})


const updateEmailDetailByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        if (req.file) {
            req.body.logo = req.file.filename;
        }
        const result = await prismaClient.emailDetail.update({ where: { email_detail_id: id }, data: req.body })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to update does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})


module.exports = { getEmailDetails, createEmailDetail, deleteEmailDetailByID, getEmailDetail, updateEmailDetailByID, deleteAllEmailDetails }