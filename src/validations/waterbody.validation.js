const Joi = require("joi");

const createWaterbody = {
    body: Joi.object().keys({
        customer_id: Joi.string().required(),
        service_location_id: Joi.string().required(),
        technician_id: Joi.string().required(),
        waterbody_Type: Joi.string().required(),
        name: Joi.string().required(),
        assigned_day: Joi.string().required(),
        frequency: Joi.string().required(),
        start_date: Joi.date().required(),
        end_date: Joi.date().required(),
        longitude: Joi.string().required(),
        latitude: Joi.string().require()
    }),
};

const getWaterbodies = {
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

const getWaterbody = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const updateWaterbody = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        customer_id: Joi.string(),
        service_location_id: Joi.string(),
        technician_id: Joi.string(),
        waterbody_Type: Joi.string(),
        name: Joi.string(),
        assigned_day: Joi.string(),
        frequency: Joi.string(),
        start_date: Joi.date(),
        end_date: Joi.date(),
    }),

};

module.exports = { createWaterbody, getWaterbodies, getWaterbody, updateWaterbody };
