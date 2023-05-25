const express = require("express")
const router = express.Router();
const { customerController } = require("../controllers/");
const { verify } = require("../middleware/auth");

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
    .get(verify(), customerController.getCustomers)
    .post(verify(), customerController.createCustomer)


router.route("/:id")
    .get(verify(), customerController.getCustomer)
    .delete(verify(), customerController.deleteCustomerByID)
    .patch(verify(), customerController.updateCustomerByID);



module.exports = router;