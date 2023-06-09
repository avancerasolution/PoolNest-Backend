
const prismaClient = require("../utils/prisma.client")

const createWorkOrder = async (body) => {
    try {
        const result = await prismaClient.activeWorkOrder.create({ body: body })
        return result
    } catch (e) {
        return false
    }

}


module.exports = { createWorkOrder }