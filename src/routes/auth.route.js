const express = require("express")
const router = express.Router();
const { authController } = require("../controllers")
const validate = require("../middleware/validate");
const dosageValidation = require("../validations/dosage.validation");
const { verify } = require("../middleware/auth");



/**
 * @swagger
 * /api/workOrderType:
 *  get:
 *      summary: Get All Work Order Types
 *      description: this is description
 *      responses:
 *          200:
 *              description: will list all the work order types
 *          
 * 
 */
router.route("/login").post(authController.login)

router.route("/me").get(verify(), authController.getMyself)


module.exports = router;
