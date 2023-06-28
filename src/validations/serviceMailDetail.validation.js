const Joi = require("joi");

const createServiceMailDetail = {
    body: Joi.object().keys({
        service_mail_detail: Joi.string(),
        admin_id: Joi.string().required(),
        subject: Joi.string(),
        header: Joi.string(),
        message: Joi.string(),
        footer: Joi.string(),
        include_reading: Joi.boolean(),
        include_dosage: Joi.boolean(),
        include__checklist: Joi.boolean(),
        include_tech: Joi.boolean(),
        include_media: Joi.boolean(),
    }),
};

const getServiceMailDetails = {
    query: Joi.object().keys({
        pageNumber: Joi.number().integer(),
        sortByField: Joi.string(),
        limit: Joi.number().integer(),
        sortOrder: Joi.string().valid("asc", "dsc")
    }),
};

const getServiceMailDetail = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const updateServiceMailDetail = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        service_mail_detail: Joi.string(),
        admin_id: Joi.string(),
        subject: Joi.string(),
        header: Joi.string(),
        message: Joi.string(),
        footer: Joi.string(),
        include_reading: Joi.boolean(),
        include_dosage: Joi.boolean(),
        include_checklist: Joi.boolean(),
        include_tech: Joi.boolean(),
        include_media: Joi.boolean(),
    }),
};

module.exports = { createServiceMailDetail, getServiceMailDetails, getServiceMailDetail, updateServiceMailDetail };
