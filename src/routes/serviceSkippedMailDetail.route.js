const express = require("express")
const router = express.Router();
const { serviceSkippedMailDetailController } = require("../controllers")
const { verify } = require("../middleware/auth")
const validate = require("../middleware/validate")
const serviceSkippedMailDetailValidation = require("../validations/serviceSkippedMailDetail.validation")


/**
 * @swagger
 * /api/serviceSkippedMailDetail:
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
    .get(verify(),
        validate(serviceSkippedMailDetailValidation.getServiceSkippedMailDetails),
        serviceSkippedMailDetailController.getServiceSkippedMailDetails)
    .post(
        verify(),
        // validate(serviceSkippedMailDetailValidation.createserviceSkippedMailDetail),
        serviceSkippedMailDetailController.createServiceSkippedMailDetail)

router.route("/:id")
    .get(
        verify(),
        validate(serviceSkippedMailDetailValidation.getServiceSkippedMailDetail),
        serviceSkippedMailDetailController.getServiceSkippedMailDetail)
    .delete(
        verify(),
        validate(serviceSkippedMailDetailValidation.getServiceSkippedMailDetail),
        serviceSkippedMailDetailController.deleteServiceSkippedMailDetailByID)
    .patch(
        verify(),
        validate(serviceSkippedMailDetailValidation.updateServiceSkippedMailDetail),
        serviceSkippedMailDetailController.updateServiceSkippedMailDetailByID);


module.exports = router;