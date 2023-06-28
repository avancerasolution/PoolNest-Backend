const express = require("express")
const router = express.Router();
const { serviceMailDetailController } = require("../controllers")
const { verify } = require("../middleware/auth")
const validate = require("../middleware/validate")
const serviceMailDetailValidation = require("../validations/serviceMailDetail.validation")


/**
 * @swagger
 * /api/ServiceMailDetail:
 *  get:
 *      summary: Get All Work Order Types
 *      description: this is description
 *      responses:
 *          200:
 *              description: will list all the work order types
 *          
 * 
 */
router.route("/")
    .get(verify(), validate(serviceMailDetailValidation.getServiceMailDetails), serviceMailDetailController.getServiceMailDetails)
    .post(verify(), validate(serviceMailDetailValidation.createServiceMailDetail), serviceMailDetailController.createServiceMailDetail)

router.route("/:id")
    .get(verify(), validate(serviceMailDetailValidation.getServiceMailDetail), serviceMailDetailController.getServiceMailDetail)
    .delete(verify(), validate(serviceMailDetailValidation.getServiceMailDetail), serviceMailDetailController.deleteServiceMailDetailByID)
    .patch(verify(), validate(serviceMailDetailValidation.updateServiceMailDetail), serviceMailDetailController.updateServiceMailDetailByID);


module.exports = router;