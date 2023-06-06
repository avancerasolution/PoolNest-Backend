const Joi = require("joi");

const createServiceLocation = {
    body: Joi.object().keys({
        customer_id: Joi.string().required(),
        technician_id: Joi.string().required(),
        name: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        email: Joi.string().email().required(),
        mobile_no: Joi.string().required(),
        address: Joi.string().required(),
        location_code: Joi.string().required(),
        gate_code: Joi.string(),
        dog_name: Joi.string(),
        minutes_per_stop: Joi.number().required(),
        sales_tax_group: Joi.string().required(),
        rate: Joi.number().required(),
        labor_cost: Joi.number().required(),
        labor_cost_type: Joi.string().valid("PER_MONTH", "PER_STOP", "NONE"),
        notes: Joi.string().required(),
        notify_sms: Joi.bool().required(),
        notify_email: Joi.bool().required(),
        notify_work_completion_sms: Joi.bool().required(),
        notify_work_completion_email: Joi.bool().required(),

    }),
};

const getWaterbodies = {
    query: Joi.object().keys({
        name: Joi.string(),
        color_code: Joi.string(),
        recurrence: Joi.string(),
        customer_id: Joi.string(),
        pageNumber: Joi.number().integer(),
        sortByField: Joi.string(),
        limit: Joi.number().integer(),
        sortOrder: Joi.string().valid("asc", "dsc")
    }),
};

const getServiceLocation = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const updateServiceLocation = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        customer_id: Joi.string(),
        name: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        email: Joi.string().email(),
        mobile_no: Joi.string(),
        address: Joi.string(),
        location_code: Joi.string(),
        gate_code: Joi.string(),
        dog_name: Joi.string(),
        minutes_per_stop: Joi.number(),
        sales_tax_group: Joi.string(),
        rate: Joi.number(),
        labor_cost: Joi.number(),
        labor_cost_type: Joi.string(),
        notes: Joi.string(),
        notify_sms: Joi.bool(),
        notify_email: Joi.bool(),
        notify_work_completion_sms: Joi.bool(),
        notify_work_completion_email: Joi.bool(),
    }),

};

module.exports = { createServiceLocation, getWaterbodies, getServiceLocation, updateServiceLocation };
