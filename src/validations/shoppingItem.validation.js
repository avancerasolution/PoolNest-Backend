const Joi = require("joi");

const createShoppingItem = {
    body: Joi.object().keys({
        waterbody_id: Joi.string().uuid().required(),
        work_order_id: Joi.string().uuid().required(),
        description: Joi.string().required(),
        item_type: Joi.string().required(),
        assigned_to: Joi.string().required(),
    }),
};


const createShoppingItems = {
    body: Joi.array().items(Joi.object().keys({
        waterbody_id: Joi.string().required(),
        work_order_id: Joi.string().uuid().required(),
        description: Joi.string().require(),
        item_type: Joi.string().required(),
        assigned_to: Joi.string().required(),
    }))
};

const getShoppingItems = {
    query: Joi.object().keys({
        waterbody_id: Joi.string().required(),
        assigned_to: Joi.string(),
        pageNumber: Joi.number().integer(),
        sortByField: Joi.string(),
        limit: Joi.number().integer(),
        sortOrder: Joi.string().valid("asc", "dsc")
    }),
};

const getShoppingItem = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const updateShoppingItem = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        waterbody_id: Joi.string(),
        waterbody_id: Joi.string(),
        work_order_id: Joi.string().uuid(),
        description: Joi.string(),
        item_type: Joi.string(),
        assigned_to: Joi.string(),
    }),

};

module.exports = { createShoppingItem, getShoppingItems, getShoppingItem, updateShoppingItem, createShoppingItems };
