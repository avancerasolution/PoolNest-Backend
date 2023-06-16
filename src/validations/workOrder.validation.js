const Joi = require("joi");

const createWorkOrder = {
    body: Joi.object().keys({
        customer_id: Joi.string().required(),
        service_location_id: Joi.string().required(),
        technician_id: Joi.string().required(),
        work_order_type_id: Joi.string().required(),
        waterbody_id: Joi.string().required(),
        status: Joi.string().required(),
        service_date: Joi.date().required(),
        estimated_time_minutes: Joi.number().required(),
        labor_cost: Joi.number().required(),
        price: Joi.number().required(),
        labor_cost_paid: Joi.bool(),
        work_performed: Joi.string(),
        notes: Joi.string(),
        work_needed: Joi.string().required()
    }),
};

const getWorkOrders = {
    query: Joi.object().keys({
        customer_id: Joi.string(),
        service_location_id: Joi.string(),
        technician_id: Joi.string(),
        work_order_type_id: Joi.string(),
        waterbody_id: Joi.string(),
        work_order_type_id: Joi.string(),
        status: Joi.string(),
        pageNumber: Joi.number().integer(),
        sortByField: Joi.string(),
        limit: Joi.number().integer(),
        sortOrder: Joi.string().valid("asc", "dsc")
    }),
};

const getWorkOrder = {
    params: Joi.object().keys({
        id: Joi.string().uuid().required(),
    }),
};

const updateWorkOrder = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        customer_id: Joi.string(),
        service_location_id: Joi.string(),
        technician_id: Joi.string(),
        work_order_type_id: Joi.string(),
        waterbody_id: Joi.string(),
        work_order_type_id: Joi.string(),
        status: Joi.string(),
        description: Joi.string(),
        service_date: Joi.date(),
        estimated_time_minutes: Joi.number(),
        labor_cost: Joi.number(),
        price: Joi.number(),
        labor_cost_paid: Joi.bool()
    }),

};


const completeWorkOrderByID = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        status: Joi.string().required(),
        description: Joi.string().required(),
        service_date: Joi.date().required(),
    }),

};

module.exports = { createWorkOrder, getWorkOrder, getWorkOrders, updateWorkOrder, completeWorkOrderByID };
