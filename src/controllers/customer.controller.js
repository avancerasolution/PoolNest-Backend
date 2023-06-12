const httpStatus = require("http-status");
const TrackError = require("../middleware/TrackError");
const { emailExist } = require("../services/customer.services");
const { paginate } = require("../utils/paginate.prisma");
const pick = require("../utils/pick");
const prismaClient = require("../utils/prisma.client")


const getCustomers = TrackError(async (req, res, next) => {
    const filters = pick(req.query, ["email", "name", "status", "customer_type", "company_name", "mobile_no_primary"])
    if (req.user.user_type !== "Client") {
        filters.admin_id = req.user.admin_id;
    }
    const options = pick(req.query, ["pageNumber", "limit", "sortByField", "sortOrder"])
    if (!options.sortBy) { options.sortBy = "customer_id" }
    const result = await paginate("customer", filters, options, { Tags: true })
    res.status(200).send({ success: true, result });

})
const getCustomer = TrackError(async (req, res, next) => {
    const id = req.params.id
    const result = await prismaClient.customer.findFirst({ where: { customer_id: id }, include: { ServiceLocation: true, Waterbody: true, Tags: true } });
    if (!result) {
        return res.status(404).send({ success: false, message: "Customer doesnt not exists" });
    }
    res.status(200).send({ success: true, result })
})


const createCustomer = TrackError(async (req, res, next) => {
    if (await emailExist(req.body.email)) {
        return res.status(400).send({ success: false, message: "customer with this email already exists" })
    }
    req.body.admin_id = req.user.admin_id;
    if (req.body.tags) {
        req.body.Tags = { create: req.body.tags.map((tag) => { return { name: tag, admin_id: req.user.admin_id } }) }
        const checkTags = await prismaClient.tags.findMany({ where: { name: { in: req.body.Tags } } })
        console.log(checkTags, "<=== wow")
        delete req.body.tags;
    }
    // try {
    //     console.log(req.body, "<=== body")
    //     const result = await prismaClient.customer.create({ data: req.body, })
    //     return res.status(201).send({ success: true, result })
    // } catch (e) {
    //     console.log(e, "<= eee")
    //     return res.status(httpStatus.BAD_REQUEST).send({ success: false, message: "invalid tag" })
    // }
    res.send("wow")
})

const deleteCustomerByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.customer.delete({ where: { customer_id: id } })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || error.message.includes("record to delete does not exist")) {
            return res.status(404).send({ success: false, message: "record does not exists" })
        }
        res.status(400).send({ success: false, message: e })
    }

})

const deleteAllCustomers = TrackError(async (req, res, next) => {
    const id = req.params.id;
    const result = await prismaClient.customer.deleteMany()
    res.status(200).send(result)
})


const updateCustomerByID = TrackError(async (req, res, next) => {
    try {
        if (req.body.email) {
            if (await emailExist(req.body.email)) {
                return res.status(400).send({ success: false, message: "customer with this email already exists" })
            }
        }
        const id = req.params.id
        const result = await prismaClient.customer.update({ where: { customer_id: id }, data: req.body })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to update does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})

module.exports = { getCustomers, createCustomer, deleteCustomerByID, getCustomer, updateCustomerByID, deleteAllCustomers }