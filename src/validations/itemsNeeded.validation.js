const Joi = require("joi");

const createItemNeeded = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        quantity: Joi.number().required(),
        waterbody_id: Joi.string().required()
    }),
};

const createItemsNeeded = {
    body: Joi.array().items(Joi.object().keys({
        waterbody_id: Joi.string().required(),
        name: Joi.string().required(),
        quantity: Joi.number().required(),
    }))
};




const getItemsNeeded = {
    query: Joi.object().keys({
        waterbody_id: Joi.string(),
        quantity: Joi.string(),
        name: Joi.string(),
        pageNumber: Joi.number().integer(),
        sortByField: Joi.string(),
        limit: Joi.number().integer(),
        sortOrder: Joi.string().valid("asc", "dsc")
    }),
};

const getItemNeeded = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const updateItemsNeeded = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        name: Joi.string(),
        quantity: Joi.number(),
        waterbody_id: Joi.string(),
    }),

};

module.exports = { createItemNeeded, getItemsNeeded, getItemNeeded, updateItemsNeeded, createItemsNeeded };