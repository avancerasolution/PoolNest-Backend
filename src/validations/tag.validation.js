const Joi = require("joi");

const createTag = {
    body: Joi.object().keys({
        name: Joi.string().required(),
    }),
};


const createTags = {
    body: Joi.array().items(Joi.object().keys({
        name: Joi.string().required(),
    }))
};


const getTags = {
    query: Joi.object().keys({
        name: Joi.string(),
        description: Joi.string(),
        pageNumber: Joi.number().integer(),
        sortByField: Joi.string(),
        limit: Joi.number().integer(),
        sortOrder: Joi.string().valid("asc", "dsc")
    }),
};

const getTag = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const updateTag = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        name: Joi.string().required(),
    }),

};

module.exports = { createTag, getTags, getTag, updateTag, createTags };
