const httpStatus = require("http-status");
const TrackError = require("../middleware/TrackError");
const { paginate } = require("../utils/paginate.prisma");
const pick = require("../utils/pick");
const prismaClient = require("../utils/prisma.client")
const bcrypt = require("bcrypt");
const { Prisma } = require("@prisma/client");
const { getDetailsAndSendMessage } = require("../services/sendGridMessaging.service");


const getServiceMailDetails = async (req, res, next) => {
    const filters = pick(req.query, ["email", "color_code", "first_name", "last_name"])
    if (req.user.user_type !== "Client") {
        filters.admin_id = req.user.admin_id;
    }
    const options = pick(req.query, ["pageNumber", "limit", "sortByField", "sortOrder"])
    if (!options.sortBy) { options.sortBy = "service_mail_detail_id" }
    const result = await paginate("serviceMailDetail", filters, options)
    res.status(200).send({ success: true, result });


}
//tech,customer,email details
// what i have , actvie service ,admin_id, and  
const getServiceMailDetail = TrackError(async (req, res, next) => {
    const id = req.params.id;
    const result = await prismaClient.serviceMailDetail.findFirst({ where: { service_mail_detail_id: id }, include: { Admin: true } });
    if (!result) {
        return res.status(404).send({ success: false, message: "no email details found" });
    }
    res.status(200).send(result)

})



const createServiceMailDetail = TrackError(async (req, res, next) => {
    try {
        req.body.admin_id = req.user.admin_id;
        const result = await prismaClient.serviceMailDetail.create({ data: req.body, })
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

const deleteServiceMailDetailByID = TrackError(async (req, res, next) => {
    try {
        const result = await prismaClient.serviceMailDetail.delete({ where: { service_mail_detail_id: req.params.id } })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to delete does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})

const deleteAllServiceMailDetails = TrackError(async (req, res, next) => {
    const result = await prismaClient.serviceMailDetail.deleteMany()
    res.status(200).send(result)
})

// const wow = async () => {
//     const result = await prismaClient.serviceMailDetail.deleteMany()
// }
// wow()

const updateServiceMailDetailByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        if (req.file) {
            req.body.logo = req.file.filename;
        }
        const result = await prismaClient.serviceMailDetail.update({ where: { service_mail_detail_id: id }, data: req.body })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to update does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})


module.exports = { getServiceMailDetails, createServiceMailDetail, deleteServiceMailDetailByID, getServiceMailDetail, updateServiceMailDetailByID, deleteAllServiceMailDetails }