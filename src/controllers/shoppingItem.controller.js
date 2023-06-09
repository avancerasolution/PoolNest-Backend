const TrackError = require("../middleware/TrackError");
const { paginate } = require("../utils/paginate.prisma");
const pick = require("../utils/pick");
const prismaClient = require("../utils/prisma.client")


const getShoppingItems = TrackError(async (req, res, next) => {
    const filters = pick(req.query, ["email", "name", "status", "customer_type", "company_name", "mobile_no_primary"])
    if (req.user.user_type !== "Client") {
        filters.admin_id = req.user.admin_id;
    }
    const options = pick(req.query, ["pageNumber", "limit", "sortByField", "sortOrder"])
    if (!options.sortBy) { options.sortBy = "shopping_item_id" }
    const result = await paginate("shoppingItem", filters, options)
    res.status(200).send({ success: true, result });

})

// const wow = async () => {
//     const wow = await prismaClient.shoppingItem.deleteMany()
// }

// wow();


const getShoppingItem = TrackError(async (req, res, next) => {
    const id = req.params.id
    const result = await prismaClient.shoppingItem.findFirst({ where: { shopping_item_id: id } });
    if (!result) {
        return res.status(404).send({ success: false, message: "Work Order Type doesnt not exists" });
    }
    res.status(200).send({ success: true, result })
})


const createShoppingItem = TrackError(async (req, res, next) => {
    req.body.admin_id = req.user.admin_id;
    if (req.files && req.files.length !== 0) {
        const imageNames = req.files.map((image) => image.filename)
        req.body.product_images = imageNames
    }
    req.body.purchased = Boolean(req.body.purchased)
    const result = await prismaClient.shoppingItem.create({ data: req.body, })
    res.status(201).send({
        success: true, result: result
    })
})

const deleteShoppingItemByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await prismaClient.shoppingItem.delete({ where: { shopping_item_id: id } })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to delete does not exist")) {
            return res.status(404).send({ success: false, message: "record does not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }

})

const deleteAllShoppingItems = TrackError(async (req, res, next) => {
    const id = req.params.id
    const result = await prismaClient.shoppingItem.deleteMany()
    res.status(200).send(result)
})

const updateShoppingItemByID = TrackError(async (req, res, next) => {
    try {
        const id = req.params.id
        if (req.files && req.files.length !== 0) {
            const imageNames = req.files.map((image) => image.filename)
            req.body.product_images = imageNames
        }
        if (req.body.purchased && typeof req.body.purchased !== "boolean") {
            if (req.body.purchased == "false") { req.body.purchased = false }
            else { req.body.purchased = true }
        }
        console.log(req.body)
        const result = await prismaClient.shoppingItem.update({ where: { shopping_item_id: id }, data: req.body })
        res.status(200).send(result)

    } catch (e) {
        if (e.code === "P2025" || e.message.includes("Record to update does not exist")) {
            return res.status(404).send({ success: false, message: "record  not exists" })
        }
        res.status(400).send({ success: false, message: e.message })
    }
})



module.exports = {
    getShoppingItems,
    createShoppingItem,
    deleteShoppingItemByID,
    getShoppingItem,
    updateShoppingItemByID,
    deleteAllShoppingItems
}