const express = require("express")
const router = express.Router();
const { customerController } = require("../controllers/");
const { verify } = require("../middleware/auth");
const customerValidation = require("../validations/customer.validation");
const validate = require("../middleware/validate");

/**
 * @swagger
 * /api/user:
 *  get:
 *      summary: Get All Users
 *      description: this is description
 *      responses:
 *          200:
 *              description: will list all the user
 *          
 * 
 */
router.route("/")
    .get(verify(), validate(customerValidation.getCustomers), customerController.getCustomers)
    .post(verify(), validate(customerValidation.createCustomer), customerController.createCustomer)


router.route("/:id")
    .get(verify(), validate(customerValidation.getCustomer), customerController.getCustomer)
    .delete(verify(), validate(customerValidation.getCustomer), customerController.deleteCustomerByID)
    .patch(verify(), validate(customerValidation.updateCustomer), customerController.updateCustomerByID);



module.exports = router;