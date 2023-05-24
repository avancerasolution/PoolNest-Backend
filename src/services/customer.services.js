const prismaClient = require("../utils/prisma.client")


const emailExist = async (email) => {
    const result = await prismaClient.customer.findUnique({ where: { email: email } })
    if (result) {
        return true
    }
    return false
}


module.exports = { emailExist }