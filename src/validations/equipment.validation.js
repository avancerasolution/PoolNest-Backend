const Joi = require("joi");

const createEquipment = {
    body: Joi.object().keys({
        waterbody_id: Joi.string().required(),
        name: Joi.string().required(),
        quantity: Joi.number().required(),
    }),
};


const createEquipments = {
    body: Joi.array().items(Joi.object().keys({
        waterbody_id: Joi.string().required(),
        name: Joi.string().required(),
        quantity: Joi.number().required(),
    }))
};

const getEquipments = {
    query: Joi.object().keys({
        name: Joi.string(),
        pageNumber: Joi.number().integer(),
        sortByField: Joi.string(),
        limit: Joi.number().integer(),
        sortOrder: Joi.string().valid("asc", "dsc")
    }),
};

const getEquipment = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const updateEquipment = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        name: Joi.string(),
        waterbody_id: Joi.string(),
        name: Joi.string(),
        quantity: Joi.number(),
    }),

};

module.exports = { createEquipment, getEquipments, getEquipment, updateEquipment, createEquipments };
