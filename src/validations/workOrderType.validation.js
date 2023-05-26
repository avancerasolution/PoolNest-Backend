const Joi = require("joi");

const createWorkOrderType = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        color_code: Joi.string().regex(/^#[A-Fa-f0-9]{6}/).required(),
        recurrence: Joi.string().required(),
        labor_cost: Joi.number().required(),
        estimated_time_in_mins: Joi.number().integer().required(),
        default_email_subject: Joi.string().required(),
        default_email_message: Joi.string().required(),
        check_list: Joi.string().required(),
        needs_invoiced: Joi.boolean().required(),
        alert_office: Joi.boolean().required(),
        photo_required: Joi.boolean().required(),
        email_to_customer: Joi.boolean().required(),
        allow_tech: Joi.boolean().required()

    }),
};

const getWorkOrderTypes = {
    query: Joi.object().keys({
        name: Joi.string(),
        color_code: Joi.string(),
        recurrence: Joi.string(),
        pageNumber: Joi.number().integer(),
        sortByField: Joi.string(),
        limit: Joi.number().integer(),
        sortOrder: Joi.string().valid("asc", "dsc")
    }),
};

const getWorkOrderType = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const updateWorkOrderType = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        name: Joi.string(),
        color_code: Joi.string().regex(/^#[A-Fa-f0-9]{6}/),
        recurrence: Joi.string(),
        labor_cost: Joi.number(),
        estimated_time_in_mins: Joi.number().integer(),
        default_email_subject: Joi.string(),
        default_email_message: Joi.string(),
        check_list: Joi.string(),
        needs_invoiced: Joi.boolean(),
        alert_office: Joi.boolean(),
        photo_required: Joi.boolean(),
        email_to_customer: Joi.boolean(),
        allow_tech: Joi.boolean()
    }),

};

module.exports = { createWorkOrderType, getWorkOrderTypes, getWorkOrderType, updateWorkOrderType };
