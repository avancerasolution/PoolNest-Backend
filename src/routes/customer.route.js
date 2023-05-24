const express = require("express")
const router = express.Router();
const { customerController } = require("../controllers/")






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
    .get(customerController.getCustomers)
    .post(customerController.createCustomer)


router.route("/:id")
    .get(customerController.getCustomer)
    .delete(customerController.deleteCustomerByID)
    .patch(customerController.updateCustomerByID);



module.exports = router;