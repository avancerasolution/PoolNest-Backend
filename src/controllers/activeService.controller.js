const httpStatus = require("http-status");
const TrackError = require("../middleware/TrackError");
const { getDateRange } = require("../utils/helperFunction");
const { paginate } = require("../utils/paginate.prisma");
const pick = require("../utils/pick");
const prismaClient = require("../utils/prisma.client");
const { onServiceCompleteMail } = require("../services/sendGridMessaging.service");


const getActiveServices = TrackError(async (req, res, next) => {
    console.log(req.query, "<=== query")
    const filters = pick(req.query, ["customer_id", "technician_id", "service_location_id", "waterbody_id", "service_id", "status", "assigned_date", "assigned_day", "service_status", "color_code"])
    if (req.user.user_type !== "Client") {
        filters.admin_id = req.user.admin_id;
    }
    const options = pick(req.query, ["pageNumber", "limit", "sortByField", "sortOrder"])
    if (!options.sortBy) { options.sortBy = "active_service_id" }
    if (filters.assigned_date) {
        filters.assigned_date = getDateRange(req.query.assigned_date)
    }
    if (filters.color_code) {
        delete filters.color_code;
        filters.technician = {
            color_code: req.query.color_code
        }
    }
    console.log(filters, "<=== filters")
    const result = await paginate("activeService", filters, options, { Technician: true })
    res.status(200).send({ success: true, result });

})

const getActiveService = TrackError(async (req, res, next) => {
    const id = req.params.id
    const result = await prismaClient.activeService.findFirst({ where: { active_service_id: id }, include: { Dosages: true, Readings: true, Technician: true, Customer: true, Waterbody: true, Service_location: true } });
    if (!result) {
        return res.status(404).send({ success: false, message: "Result doesnt not exists" });
    }
    res.status(200).send({ success: true, result })
})


const createActiveService = TrackError(async (req, res, next) => {
    req.body.admin_id = req.user.admin_id;
    const result = await prismaClient.activeService.create({ data: req.body, })
    res.status(201).send({ success: true, result })
})


const createActiveServices = TrackError(async (req, res, next) => {
    let body = req.body.map((item) => {
        return { ...item, admin_id: req.user.admin_id }
    })
    const result = await prismaClient.activeService.createMany({ data: body })
    res.status(201).send({ success: true, result })
})


const deleteActiveServiceByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.activeService.delete({ where: { active_service_id: id } })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to delete does not exist")) {
            return res.status(404).send({ success: false, message: "record doesnt exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }

})

const deleteActiveServices = TrackError(async (req, res, next) => {
    const id = req.params.id
    const result = await prismaClient.activeService.deleteMany()
    res.status(200).send(result)
})



const updateActiveServiceByID = TrackError(async (req, res, next) => {
    try {
        if (req.files) {
            if (req.files.media) {
                req.body.media = req.files.map((item) => (item.filename))
            }
        }
        const id = req.params.id
        //verify active service
        const serviceDetails = await prismaClient.activeService.findFirst({ where: { active_service_id: id }, include: { Service_location: true, Customer: true, Technician: true, Waterbody: true, Dosages: true, Readings: true, ServiceChecklist: true } })
        if (!serviceDetails) {
            return res.status(httpStatus.BAD_REQUEST).send({ success: false, message: "invalid actice_service_id" })
        }
        const mailDetails = await prismaClient.emailDetail.findFirst({ where: { admin_id: req.user.admin_id } });
        if (req.body.status === "completed") {// this code will run the active service is completed
            const onServiceCompleteMailDetails = await prismaClient.serviceMailDetail.findFirst({ where: { admin_id: req.user.admin_id } })
            const sendServiceCompletionMail = await onServiceCompleteMail(serviceDetails, mailDetails, onServiceCompleteMailDetails)

        }
        // const result = await prismaClient.activeService.update({ where: { active_service_id: id }, data: req.body })
        res.status(200).send("result")

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to update does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})

module.exports = { getActiveService, createActiveService, deleteActiveServiceByID, getActiveServices, updateActiveServiceByID, deleteActiveServices, createActiveServices }