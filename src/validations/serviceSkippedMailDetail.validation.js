const Joi = require("joi");

// const createServiceSkippedMailDetail = {
//     body: Joi.object().keys({
//         service_mail_detail: Joi.string(),
//         admin_id: Joi.string().required(),
//         subject: Joi.string(),
//         header: Joi.string(),
//         message: Joi.string(),
//         footer: Joi.string(),
//         include_reading: Joi.boolean(),
//         include_dosage: Joi.boolean(),
//         include__checklist: Joi.boolean(),
//         include_tech: Joi.boolean(),
//         include_media: Joi.boolean(),
//     }),
// };

const getServiceSkippedMailDetails = {
    query: Joi.object().keys({
        pageNumber: Joi.number().integer(),
        sortByField: Joi.string(),
        limit: Joi.number().integer(),
        sortOrder: Joi.string().valid("asc", "dsc")
    }),
};

const getServiceSkippedMailDetail = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const updateServiceSkippedMailDetail = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        include_tech_reason: Joi.boolean(),
        include_reason_in_mail: Joi.boolean(),
        email_office: Joi.boolean(),
        email_customer: Joi.boolean(),
        subject: Joi.string(),
        header: Joi.string(),
        message: Joi.string(),
        footer: Joi.string()
    })
};

module.exports = { getServiceSkippedMailDetails, getServiceSkippedMailDetail, updateServiceSkippedMailDetail };
