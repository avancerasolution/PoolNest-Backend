const Joi = require("joi");

const createUser = {
    body: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        username: Joi.string().required(),
        color_code: Joi.string().regex(/^#[A-Fa-f0-9]{6}/).required(),
        user_type: Joi.string().valid("Admin", "Technician", "SuperAdmin").required(),
        email: Joi.string().email().required(),
        see_other_tech: Joi.boolean().required(),
        manage_admin_panel: Joi.boolean().required(),
        manage_general_settings: Joi.boolean().required(),
        manage_route_stops: Joi.boolean().required(),
        rearrange_routes: Joi.boolean().required(),
        is_active: Joi.boolean().required(),
        password: Joi.string().min(8).required(),
        // city: Joi.string().required(),
        // state: Joi.string().required(),
        // zipcode: Joi.string().required(),
        // mobile_no_primary: Joi.string().required(),
        // mobile_no_secondary: Joi.string(),
        // company_name: Joi.string(),
        // company_address: Joi.string(),
        // billing_address: Joi.string().required(),
        // billing_details: Joi.string().required(),
    }),
};

const getUsers = {
    query: Joi.object().keys({
        first_name: Joi.string(),
        last_name: Joi.string(),
        username: Joi.string(),
        email: Joi.string(),
        color_code: Joi.string(),
        pageNumber: Joi.number().integer(),
        sortByField: Joi.string(),
        limit: Joi.number().integer(),
        sortOrder: Joi.string().valid("asc", "dsc")
    }),
};

const getUser = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const updateUser = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        first_name: Joi.string(),
        last_name: Joi.string(),
        username: Joi.string(),
        color_code: Joi.string().regex(/^#[A-Fa-f0-9]{6}/),
        // user_type: Joi.string().valid("Admin", "Techinician", "SuperAdmin").required(),
        email: Joi.string().email(),
        see_other_tech_routes: Joi.boolean(),
        manage_admin_panel: Joi.boolean(),
        manage_general_settings: Joi.boolean(),
        move_route_stops: Joi.boolean(),
        rearrange_routes: Joi.boolean()
    }),
};

module.exports = { createUser, getUsers, getUser, updateUser };
