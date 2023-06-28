const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const prismaClient = require("../utils/prisma.client");
const httpStatus = require('http-status');
const SERVER_URL = process.env.SERVER_URL;

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

//we need technician, customer and admin email details to send mail
const getDetailsAndSendMessage = async (tech, customer, emailDetail) => {

    const msg = {
        from: emailDetail.email,
        to: customer.email,
        subject: `Service Completion from ${emailDetail.company_name}`,
        text: `<!DOCTYPE html><html><head><title>Service Completion</title><style>body{font-family:Arial,sans-serif;background-color:#f5f5f5;margin:0;padding:0}.container{max-width:600px;margin:0 auto;padding:20px;background-color:#ffffff;border-radius:4px;box-shadow:0 2px 4px rgba(0,0,0,.1)}h1{text-align:center;color:#333333}p{color:#555555;line-height:1.5}ul{color:#555555;line-height:1.5;padding-left:20px}.contact-info{background-color:#f8f8f8;padding:20px;margin-top:40px}.contact-info h4{text-align:center;color:#333333}.contact-info p{text-align:center;color:#555555;line-height:1.5}.logo{text-align:center;margin-bottom:20px}.logo img{max-width:150px}</style></head><body><div class="container"><div class="logo"><img src="${emailDetail.company_name}" alt="Company Logo"></div><h1>Service Completion</h1><p>Dear ${customer.first_name + " " + customer.last_name},</p><p>We are pleased to inform you that the requested service has been successfully completed. The details of the service are as follows:</p><ul><li>Service Time: ${new Date()}</li><li>Serviced By: ${tech.first_name + " " + tech.last_name}</li></ul><p>We hope the outcome meets your expectations and requirements. If you have any questions or need further assistance, please feel free to contact us. We are always here to help!</p><p>Thank you for choosing ${emailDetail.company_name}.</p><div class="contact-info"><h4>Contact Information</h4><p>${emailDetail.company_name}</p><p>${emailDetail?.company_address}</p><p>${emailDetail.zipcode}, ${emailDetail?.city}, ${emailDetail?.state}</p><p>Phone: ${emailDetail?.mobile_no}</p><p>Email: <a href="mailto:${emailDetail?.email}">${emailDetail?.email}</a></p><p>Website: <a href="${emailDetail?.website}">${emailDetail?.email}</a></p></div></div></body></html>`
    }
    try {
        const result = await sgMail.send(msg)
        console.log(result, "<=== mail result")
    } catch (e) {
        console.log(e)
    }

}


const onServiceCompleteMail = async (service, emailDetail, serviceCompletionDetails) => {
    console.log(service, "<==== wow")
    console.log(emailDetail, "<==== mail detail")
    console.log(serviceCompletionDetails, "<==== service mail detail")
    // convert all the instring variable to values
    //subject first
    // let subject = serviceCompletionDetails.subject.replace("{DATE}", new Date())
    const messageVars = [["{DATE}", new Date()], ["{SERVICE LOCATION NAME}", service.Service_location.name], ["{POOL NAME}", service.Waterbody.name]]
    const viableMessage = replaceWords(serviceCompletionDetails.message, messageVars)
    console.log(viableMessage, "<==== wow")
    const emailTemplate = `
    <!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>
      body{font-family:Arial, sans-serif; line-height: 1.6; padding: 20px; background-color: #f5f5f5;}
      h1{color: #333333; font-size: 24px; margin: 0;}
      h2{color: #333333; font-size: 20px; margin-top: 30px; margin-bottom: 10px;}
      p{color: #555555; font-size: 16px; margin-bottom: 5px;}
      table{border-collapse:collapse;width:100%; margin-bottom: 20px; background-color: #ffffff;}
      table th, table td{border:1px solid #dddddd; padding: 8px;}
      footer{margin-top: 30px; background-color: #f5f5f5; padding: 20px; font-size: 14px; color: #888888; text-align: center;}
      .logo{margin-bottom: 10px;}
    </style></head><body>
      <h1>Service Completion Mail</h1>
      <p>${serviceCompletionDetails.header}</p>

      <p>${viableMessage}</p>
      <h2>Customer Details</h2>
      <p>Customer Name: ${service.Customer.first_name + " " + service.Customer.last_name}</p>
      <p>Customer Email: ${service.Customer.email}</p>
      <p>Customer Phone:${service.Customer.mobile_no_primary}</p>
      ${service.Customer.mobile_no_secondary ? `<p> Customer Phone:${service.Customer.mobile_no_secondary} </p>` : ``}
      
      ${serviceCompletionDetails?.include_tech ? `
      <h2>Technician Details</h2>
      <p>Technician Name: ${service.Technician.first_name + " " + service.Technician.last_name}</p>
      <p>Technician Email: ${service.Technician.email}</p>
      ` : ``}

      ${serviceCompletionDetails?.include_dosage ? `
      <h2>Dosage Details</h2>${service?.Dosages.map((item) => `<p>name: ${item?.name}</p><p>unit of measurement: ${item?.unit_of_measurement}</p><p>quantity: ${item?.values.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</p><p>cost per unit: ${item?.price_per_unit}</p><p>Description:${item?.description}</p>`)}
      ` : ``}
      
      ${serviceCompletionDetails.include_reading ? `
      <h2>Reading Details</h2>${service?.Readings.map((item) => `<p>name: ${item?.name}</p><p>unit of measurement: ${item?.unit_of_measurement}</p><p>quantity: ${item?.values.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</p><p>Description:${item?.description}</p>`)}
      ` : ``}

      ${serviceCompletionDetails.include_checklist ? `
      <h2>Checklist Details</h2>${service?.ServiceChecklist?.map((item) => `<p>Description: ${item?.description_on_complete}</p>`)}
      ` : ``}

      ${serviceCompletionDetails?.include_media ? `<h2>images and video</h2>${service?.media.map((item) => `<img class="logo"  style="max-width: 100px; alt="pool_pictures"" src=${SERVER_URL + "/assets/" + item}></img>`)}` : null}
      
    <p>${serviceCompletionDetails?.footer}</p>
      <footer>
      ${emailDetail.logo ? `<div class="logo">
      <img src="${SERVER_URL + "/assets" + emailDetail?.logo} alt="Company Logo" style="max-width: 100px;">
    </div>` : ``}
    
    <p>Company Name:${emailDetail.company_name}</p>
    <p>Location: ${emailDetail.company_address + ", " + emailDetail.city + ", " + emailDetail.state + ", " + emailDetail.zipcode}</p>
    <p>Email: ${emailDetail.email}</p>
    <p>Phone: ${emailDetail.mobile_no}</p>
    <p>Website: ${emailDetail.website} </p>

  </footer>
    </body></html>`;
    console.log(emailTemplate);
    const msg = {
        from: emailDetail.email,
        to: service.Customer.email,
        subject: serviceCompletionDetails.subject,
        html: emailTemplate
    }
    console.log(msg, "<=== fainal")

    try {
        const result = await sgMail.send(msg)
        console.log(result, "<=== mail result")
    } catch (e) {
        console.log(e)
    }
}

const onServiceSkippedMail = (tech, service, emailDetail, serviceSkippedMailDetail) => {

}


function replaceWords(string, replacements) {
    for (const [search, replace] of replacements) {
        string = string.replace(new RegExp(search, 'g'), replace);
    }
    return string;
}

module.exports = { sendSimpleMessage, getDetailsAndSendMessage, onServiceCompleteMail }