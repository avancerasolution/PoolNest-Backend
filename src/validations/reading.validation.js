const Joi = require("joi");

const createReading = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        unit_of_measurement: Joi.string().required(),
        values: Joi.array().items(Joi.number()).required(),
        active_service_id: Joi.string().uuid().required()
    }),
};

const getReadings = {
    query: Joi.object().keys({
        name: Joi.string(),
        description: Joi.string(),
        pageNumber: Joi.number().integer(),
        sortByField: Joi.string(),
        limit: Joi.number().integer(),
        sortOrder: Joi.string().valid("asc", "dsc")
    }),
};

const getReading = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const updateReading = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        name: Joi.string(),
        description: Joi.string(),
        unit_of_measurement: Joi.string(),
        values: Joi.array().items(Joi.number())
    }),

};

module.exports = { createReading, getReadings, getReading, updateReading };
