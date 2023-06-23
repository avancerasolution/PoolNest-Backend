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


const getDetailsAndSendMessage = async (tech, customer, emailDetail) => {

    const msg = {
        from: emailDetail.email,
        to: customer.email,
        subject: `Service Completion from ${emailDetail.company_name}`,
        text: `<!DOCTYPE html><html><head><title>Service Completion</title><style>body{font-family:Arial,sans-serif;background-color:#f5f5f5;margin:0;padding:0}.container{max-width:600px;margin:0 auto;padding:20px;background-color:#ffffff;border-radius:4px;box-shadow:0 2px 4px rgba(0,0,0,.1)}h1{text-align:center;color:#333333}p{color:#555555;line-height:1.5}ul{color:#555555;line-height:1.5;padding-left:20px}.contact-info{background-color:#f8f8f8;padding:20px;margin-top:40px}.contact-info h4{text-align:center;color:#333333}.contact-info p{text-align:center;color:#555555;line-height:1.5}.logo{text-align:center;margin-bottom:20px}.logo img{max-width:150px}</style></head><body><div class="container"><div class="logo"><img src="${emailDetail.company_name}" alt="Company Logo"></div><h1>Service Completion</h1><p>Dear ${customer.first_name + " " + customer.last_name},</p><p>We are pleased to inform you that the requested service has been successfully completed. The details of the service are as follows:</p><ul><li>Service Time: ${new Date()}</li><li>Serviced By: ${tech.first_name + " " + tech.last_name}</li></ul><p>We hope the outcome meets your expectations and requirements. If you have any questions or need further assistance, please feel free to contact us. We are always here to help!</p><p>Thank you for choosing ${emailDetail.company_name}.</p><div class="contact-info"><h4>Contact Information</h4><p>${emailDetail.company_name}</p><p>${emailDetail?.company_address}</p><p>${emailDetail.zipcode}, ${emailDetail?.city}, ${emailDetail?.state}</p><p>Phone: ${emailDetail?.mobile_no}</p><p>Email: <a href="mailto:${emailDetail?.email}">${emailDetail?.email}</a></p><p>Website: <a href="${emailDetail?.website}">${emailDetail?.email}</a></p></div></div></body></html>`
    }
    try {
        const result = await sgMail.send(msg)
    } catch (e) {
        console.log(e)
    }

}


const onServiceCompleteMail = (tech, service, emailDetail) => {
    const html = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Service Completion</title><style>body{font-family:Arial,sans-serif;margin:0;padding:20px;}h1{color:#333;font-size:24px;margin-bottom:20px;}p{color:#555;font-size:16px;line-height:1.5;}strong{font-weight:bold;}</style></head><body><h1>Service Completion Report</h1><p>Dear [Customer Name],</p><p>We are pleased to inform you that the service you requested has been completed. Below are the details of the work performed:</p><h2>Technician Information</h2><p><strong>Technician Name:</strong> [Technician Name]<br><strong>Technician ID:</strong> [Technician ID]<br><strong>Contact Email:</strong> [Technician Email]<br><strong>Contact Phone:</strong> [Technician Phone]</p><h2>Work Details</h2><p><strong>Service Type:</strong> [Service Type]<br><strong>Service Date:</strong> [Service Date]<br><strong>Service Time:</strong> [Service Time]<br><strong>Service Description:</strong> [Service Description]</p><p>Please don't hesitate to contact us if you have any questions or require further assistance.</p><p>Thank you for choosing our services!</p><p>Sincerely,<br>[Your Company Name]</p></body></html>    "


}

module.exports = { sendSimpleMessage, getDetailsAndSendMessage }