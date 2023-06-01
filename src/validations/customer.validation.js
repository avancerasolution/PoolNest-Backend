const Joi = require("joi");

const createCustomer = {
    body: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zipcode: Joi.string().required(),
        email: Joi.string().email().required(),
        mobile_no_primary: Joi.string().required(),
        mobile_no_secondary: Joi.string(),
        customer_type: Joi.string().required(),
        company_name: Joi.string(),
        company_address: Joi.string(),
        billing_address: Joi.string(),
        billing_details: Joi.string(),
    }),
};

const getCustomers = {
    query: Joi.object().keys({
        name: Joi.string(),
        description: Joi.string(),
        pageNumber: Joi.number().integer(),
        sortByField: Joi.string(),
        limit: Joi.number().integer(),
        sortOrder: Joi.string().valid("asc", "dsc")
    }),
};

const getCustomer = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const updateCustomer = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        first_name: Joi.string(),
        last_name: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        zipcode: Joi.string(),
        email: Joi.string().email(),
        mobile_no_primary: Joi.string(),
        mobile_no_secondary: Joi.string(),
        company_name: Joi.string(),
        company_address: Joi.string(),
        billing_address: Joi.string(),
        billing_details: Joi.string(),
        customer_type: Joi.string()
    }),

};

module.exports = { createCustomer, getCustomers, getCustomer, updateCustomer };
