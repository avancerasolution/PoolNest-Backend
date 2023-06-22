const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const prismaClient = require("../utils/prisma.client");
const ApiError = require('../utils/APIError');
const httpStatus = require('http-status');

const sendSimpleMessage = async ({ subject, text, to, from }) => {
    const msg = {
        from,
        to,
        subject,
        text,
    }
    try {
        const result = await sgMail.send(msg)
    } catch (e) {
        console.log(e)
    }
}


const getDetailsAndSendMessage = async (body) => {
    const emailDetails = await prismaClient.emailDetail.findFirst({ where: { admin_id: body.admin_id } });
    console.log(emailDetails, "<=== wow")
    if (emailDetails) throw new ApiError(httpStatus.BAD_REQUEST, "invalid message details")
}


const onServiceCompleteMail = (tech, service, emailDetail) => {
    const html = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Service Completion</title><style>body{font-family:Arial,sans-serif;margin:0;padding:20px;}h1{color:#333;font-size:24px;margin-bottom:20px;}p{color:#555;font-size:16px;line-height:1.5;}strong{font-weight:bold;}</style></head><body><h1>Service Completion Report</h1><p>Dear [Customer Name],</p><p>We are pleased to inform you that the service you requested has been completed. Below are the details of the work performed:</p><h2>Technician Information</h2><p><strong>Technician Name:</strong> [Technician Name]<br><strong>Technician ID:</strong> [Technician ID]<br><strong>Contact Email:</strong> [Technician Email]<br><strong>Contact Phone:</strong> [Technician Phone]</p><h2>Work Details</h2><p><strong>Service Type:</strong> [Service Type]<br><strong>Service Date:</strong> [Service Date]<br><strong>Service Time:</strong> [Service Time]<br><strong>Service Description:</strong> [Service Description]</p><p>Please don't hesitate to contact us if you have any questions or require further assistance.</p><p>Thank you for choosing our services!</p><p>Sincerely,<br>[Your Company Name]</p></body></html>    "
    

}

module.exports = { sendSimpleMessage, getDetailsAndSendMessage }