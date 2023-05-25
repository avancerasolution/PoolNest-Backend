const bcrypt = require("bcrypt")
const prismaClient = require("./prisma.client")

const comparePassword = async (hash, password) => {
    return await bcrypt.compare(password, hash)
}


module.exports = { comparePassword }