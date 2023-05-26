const Joi = require("joi");

const createServiceChecklist = {
    body: Joi.object().keys({
        description: Joi.string().required(),
        description_on_complete: Joi.string().required(),

    }),
};

const getServiceChecklists = {
    query: Joi.object().keys({
        description: Joi.string(),
        pageNumber: Joi.number().integer(),
        sortByField: Joi.string(),
        limit: Joi.number().integer(),
        sortOrder: Joi.string().valid("asc", "dsc")
    }),
};

const getServiceChecklist = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const updateServiceChecklist = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        description: Joi.string(),
        description_on_complete: Joi.string(),
    }),

};

module.exports = { createServiceChecklist, getServiceChecklists, getServiceChecklist, updateServiceChecklist };
