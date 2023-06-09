const Joi = require("joi");

const createDosage = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        unit_of_measurement: Joi.string().required(),
        description: Joi.string().required(),
        cost_per_unit: Joi.number().required(),
        price_per_unit: Joi.number().required(),
        include_service_price: Joi.bool().required(),
        values: Joi.array().items(Joi.number()).required(),
        active_service_id: Joi.string().uuid().required()
    }),
};


const createDosages = {
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


const getDosages = {
    query: Joi.object().keys({
        active_service_id: Joi.string().uuid(),
        description: Joi.string(),
        pageNumber: Joi.number().integer(),
        sortByField: Joi.string(),
        limit: Joi.number().integer(),
        sortOrder: Joi.string().valid("asc", "dsc")
    }),
};

const getDosage = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const updateDosage = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        name: Joi.string(),
        unit_of_measurement: Joi.string(),
        description: Joi.string(),
        cost_per_unit: Joi.number(),
        price_per_unit: Joi.number(),
        include_service_price: Joi.bool(),
        values: Joi.array().items(Joi.number())
    }),

};

module.exports = { createDosage, getDosages, getDosage, updateDosage, createDosages };
