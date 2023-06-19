const Joi = require("joi");

const createEmailDetail = {
    body: Joi.object().keys({
        from_name: Joi.string().required(),
        from_email: Joi.string().email().required(),
        // company_email: Joi.string().required(),
        company_name: Joi.string().required(),
        company_address: Joi.string().required(),
        bcc_list: Joi.array().items(Joi.string().email()),
        city: Joi.string(),
        state: Joi.string(),
        zipcode: Joi.string(),
        email: Joi.string().email(),
        mobile_no: Joi.string(),
        website: Joi.string(),
        send_email_to_customer: Joi.boolean(),
        alternative_email: Joi.string().email(),
    }),
};


const createEmailDetails = {
    body: Joi.array().items(Joi.object().keys({
        name: Joi.string().required(),
        unit_of_measurement: Joi.string().required(),
        description: Joi.string().required(),
        cost_per_unit: Joi.number().required(),
        price_per_unit: Joi.number().required(),
        include_service_price: Joi.bool().required(),
        values: Joi.array().items(Joi.number()).required(),
        active_service_id: Joi.string().uuid().required()
    }))
};


const getEmailDetails = {
    query: Joi.object().keys({
        active_service_id: Joi.string().uuid(),
        description: Joi.string(),
        pageNumber: Joi.number().integer(),
        sortByField: Joi.string(),
        limit: Joi.number().integer(),
        sortOrder: Joi.string().valid("asc", "dsc")
    }),
};

const getEmailDetail = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const updateEmailDetail = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        from_name: Joi.string(),
        from_email: Joi.string().email(),
        company_email: Joi.string(),
        company_name: Joi.string(),
        bcc_list: Joi.array().items(Joi.string().email()),
        company_address: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        zipcode: Joi.string(),
        email: Joi.string().email(),
        mobile_no: Joi.string(),
        website: Joi.string(),
        send_email_to_customer: Joi.boolean(),
        alternative_email: Joi.string().email(),
    }),

};
module.exports = { createEmailDetail, getEmailDetails, getEmailDetail, updateEmailDetail, createEmailDetails };