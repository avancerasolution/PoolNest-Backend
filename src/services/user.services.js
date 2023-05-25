const prismaClient = require("../utils/prisma.client")

const emailExist = async (email) => {
    const result = await prismaClient.user.findUnique({ where: { email: email } })
    if (result) {
        return true
    }
    return false
}

const usernameExist = async (username) => {
    const result = await prismaClient.user.findUnique({ where: { username } })
    if (result) {
        return true
    }
    return false
}
const getUserByEmail = async (email) => {
    const result = await prismaClient.user.findUnique({ where: { email: email } })
    if (result) {
        return result
    }
    return false
}
const getUserByID = async (id) => {
    return await prismaClient.user.findUnique({ where: { id } })
}

module.exports = { emailExist, usernameExist, getUserByEmail, getUserByID }
