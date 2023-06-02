const Joi = require("joi");

const createActiveService = {
    body: Joi.object().keys({
        service_id: Joi.string().required(),
        status: Joi.string(),
        cost: Joi.number(),
        price: Joi.number(),
        total: Joi.number(),
        payment_method: Joi.string(),
        payment_status: Joi.string(),
        images: Joi.string(),

    }),
};


const createActiveServices = {
    body: Joi.array().items(Joi.object().keys({
        waterbody_id: Joi.string().required(),
        name: Joi.string().required(),
        quantity: Joi.number().required(),
    }))
};

const getActiveServices = {
    query: Joi.object().keys({
        name: Joi.string(),
        pageNumber: Joi.number().integer(),
        sortByField: Joi.string(),
        limit: Joi.number().integer(),
        sortOrder: Joi.string().valid("asc", "dsc")
    }),
};

const getActiveService = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const updateActiveService = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        status: Joi.string(),
        cost: Joi.number(),
        price: Joi.number(),
        total: Joi.number(),
        payment_method: Joi.string(),
        payment_status: Joi.string(),
    }),

};

module.exports = { createActiveService, getActiveServices, getActiveService, updateActiveService, createActiveServices };
