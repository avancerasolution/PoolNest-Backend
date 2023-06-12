const { PrismaClient } = require('@prisma/client');
const bcrypt = require("bcrypt")

const prismaClient = new PrismaClient()


prismaClient.$connect().then(async () => {
    console.log("Prisma client is connected");
    const jobs = require("../jobs/")
    await onServerStartUp()
});



const onServerStartUp = async () => {
    let data = {
        first_name: process.env.CLIENT_FIRST_NAME,
        last_name: process.env.CLIENT_LAST_NAME,
        username: process.env.CLIENT_USERNAME,
        email: process.env.CLIENT_EMAIL,
        user_type: "Client",
        // isSuperAdmin: true,
        see_other_tech: true,
        manage_admin_panel: true,
        manage_general_settings: true,
        manage_route_stops: true,
        rearrange_routes: true,
        color_code: "#ffffff",
        password: await bcrypt.hash(process.env.CLIENT_PASSWORD, 8)
    }
    const check = await prismaClient.user.findFirst({ where: { user_type: "Client" } })
    if (!check) {
        let client = await prismaClient.user.create({ data: data })
        console.log("client created", client)
    }
    console.log("client exists")

}

module.exports = prismaClient