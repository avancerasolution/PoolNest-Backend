const httpStatus = require("http-status");
const TrackError = require("../middleware/TrackError");
const { paginate } = require("../utils/paginate.prisma");
const pick = require("../utils/pick");
const prismaClient = require("../utils/prisma.client")
const bcrypt = require("bcrypt");
const { Prisma } = require("@prisma/client");
const { getDetailsAndSendMessage } = require("../services/sendGridMessaging.service");


const getServiceSkippedMailDetails = async (req, res, next) => {
    const filters = pick(req.query, ["email", "color_code", "first_name", "last_name"])
    if (req.user.user_type !== "Client") {
        filters.admin_id = req.user.admin_id;
    }
    const options = pick(req.query, ["pageNumber", "limit", "sortByField", "sortOrder"])
    if (!options.sortBy) { options.sortBy = "service_skipped_mail_id" }
    const result = await paginate("serviceSkippedMailDetail", filters, options)
    res.status(200).send({ success: true, result });


}
//tech,customer,email details
// what i have , actvie service ,admin_id, and  
const getServiceSkippedMailDetail = TrackError(async (req, res, next) => {
    const id = req.params.id;
    const result = await prismaClient.serviceSkippedMailDetail.findFirst({ where: { service_skipped_mail_id: id }, include: { Admin: true } });
    if (!result) {
        return res.status(404).send({ success: false, message: "no email details found" });
    }
    res.status(200).send(result)

})



const createServiceSkippedMailDetail = TrackError(async (req, res, next) => {
    try {
        req.body.admin_id = req.user.admin_id;
        const result = await prismaClient.serviceSkippedMailDetail.create({ data: req.body, })
        res.status(201).send({ success: true, result })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
            console.error('Unique constraint violation error:', e.meta);
            return res.status(400).send({ success: false, message: "admin_id already exists" })
        } else {
            console.error('Unique constraint violation error:', e.meta);
            return res.status(400).send({ success: false, message: "something went wrong , oops!" })
        }
    }

})

const deleteServiceSkippedMailDetailByID = TrackError(async (req, res, next) => {
    try {
        const result = await prismaClient.serviceSkippedMailDetail.delete({ where: { service_skipped_mail_id: req.params.id } })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to delete does not exist")) {
            return res.status(404).send({ success: false, message: "record  not found" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})

const deleteAllServiceSkippedMailDetails = TrackError(async (req, res, next) => {
    const result = await prismaClient.serviceSkippedMailDetail.deleteMany()
    res.status(200).send(result)
})

// const wow = async () => {
//     const result = await prismaClient.ServiceSkippedMailDetail.deleteMany()
// }
// wow()

const updateServiceSkippedMailDetailByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        if (req.file) {
            req.body.logo = req.file.filename;
        }
        const result = await prismaClient.serviceSkippedMailDetail.update({ where: { service_skipped_mail_id: id }, data: req.body })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to update does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})


module.exports = { getServiceSkippedMailDetails, createServiceSkippedMailDetail, deleteServiceSkippedMailDetailByID, getServiceSkippedMailDetail, updateServiceSkippedMailDetailByID, deleteAllServiceSkippedMailDetails }