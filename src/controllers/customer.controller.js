const TrackError = require("../middleware/TrackError");
const { emailExist } = require("../services/customer.services");
const prismaClient = require("../utils/prisma.client")


const getCustomers = TrackError(async (req, res, next) => {
    const result = await prismaClient.customer.findMany()
    res.status(200).send({ success: true, result });

})

const getCustomer = TrackError(async (req, res, next) => {
    const id = parseInt(req.params.id)
    const result = await prismaClient.customer.findFirst({ where: { customer_id: id } });
    if (!result) {
        return res.status(404).send({ success: false, message: "Customer doesnt not exists" });
    }
    res.status(200).send({ success: true, result })
})


const createCustomer = TrackError(async (req, res, next) => {
    if (await emailExist(req.body.email)) {
        return res.status(400).send({ success: false, message: "customer with this email already exists" })
    }

    const result = await prismaClient.customer.create({ data: req.body, })
    res.status(201).send({ success: true, result })
})

const deleteCustomerByID = TrackError(async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const result = await prismaClient.customer.delete({ where: { customer_id: id } })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || error.message.includes("Record to delete does not exist")) {
            return res.status(404).send({ success: false, message: "record does not exists" })
        }
        res.status(400).send({ success: false, message: e })
    }

})

const deleteAllCustomers = TrackError(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const result = await prismaClient.customer.deleteMany()
    res.status(200).send(result)
})


const updateCustomerByID = TrackError(async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const result = await prismaClient.customer.update({ where: { customer_id: id }, data: req.body })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || error.message.includes("Record to update does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})


module.exports = { getCustomers, createCustomer, deleteCustomerByID, getCustomer, updateCustomerByID, deleteAllCustomers }