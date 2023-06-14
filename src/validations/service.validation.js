const Joi = require("joi");

const createService = {
    body: Joi.object().keys({
        customer_id: Joi.string().required(),
        technician_id: Joi.string().required(),
        waterbody_id: Joi.string().required(),
        service_location_id: Joi.string().required(),
        assigned_day: Joi.string().required().valid("MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"),
        status: Joi.string().required(),
        frequency: Joi.string().valid("WEEKLY", "EVERY_TWO_WEEKS", "EVERY_THREE_WEEKS", "EVERY_FOUR_WEEKS").required(),
        start_date: Joi.date().required(),
        rate: Joi.number().required(),
        labor_cost: Joi.number().required(),
        labor_cost_type: Joi.string().valid("PER_MONTH", "PER_STOP", "NONE").required(),
        minutes_per_stop: Joi.number().required(),
        stop_date: Joi.alternatives().try(Joi.string().valid("NO_END"), Joi.date()).required()
    }),
};

const getServices = {
    query: Joi.object().keys({
        technician_id: Joi.string(),
        waterbody_id: Joi.string(),
        customer_id: Joi.string(),
        status: Joi.string(),
        frequency: Joi.string(),
        pageNumber: Joi.number().integer(),
        sortByField: Joi.string(),
        limit: Joi.number().integer(),
        sortOrder: Joi.string().valid("asc", "dsc")
    }),
};

const getService = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const updateService = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        technician_id: Joi.string(),
        waterbody_id: Joi.string(),
        service_location_id: Joi.string(),
        assigned_day: Joi.string().valid("MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"),
        status: Joi.string(),
        // frequency: Joi.string().valid("WEEKLY", "EVERY_TWO_WEEKS", "EVERY_THREE_WEEKS", "EVERY_FOUR_WEEKS"),  CANT SEND FREQUENCY
        rate: Joi.number(),
        labor_cost: Joi.number(),
        labor_cost_type: Joi.string().valid("PER_MONTH", "PER_STOP", "NONE"),
        minutes_per_stop: Joi.number(),
        start_date: Joi.date(),
        stop_date: Joi.date(),
    }),

};

module.exports = { createService, getServices, getService, updateService };
