const cron = require('node-cron');
const prismaClient = require('../utils/prisma.client');


const monthlyActiveServiceCreateor = () => {

    // cron.schedule('*/3 * * * * *', () => {
    //     console.log('Running a task every 3 seconds');
    // });
    const currentMonth = new Date()
    var lastDateOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    const services = prismaClient.service.findMany({ status: "active", stop_date: { gte: currentMonth } })
    console.log(lastDateOfMonth, "<==== wow")


}


module.exports = { monthlyActiveServiceCreateor }