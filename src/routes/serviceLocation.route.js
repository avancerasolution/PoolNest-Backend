const express = require("express")
const router = express.Router();
const { serviceLocationController } = require("../controllers")
const { verify } = require("../middleware/auth")
const validate = require("../middleware/validate")
const serviceLocationValidation = require("../validations/serviceLocation.validation")


/**
 * @swagger
 * /api/ServiceLocation:
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
    .get(verify(), validate(serviceLocationValidation.getServiceLocation), serviceLocationController.getServiceLocations)
    .post(verify(), validate(serviceLocationValidation.createServiceLocation), serviceLocationController.createServiceLocation)

router.route("/:id")
    .get(verify(), validate(serviceLocationValidation.getServiceLocation), serviceLocationController.getServiceLocation)
    .delete(verify(), validate(serviceLocationValidation.getServiceLocation), serviceLocationController.deleteServiceLocationByID)
    .patch(verify(), validate(serviceLocationValidation.updateServiceLocation), serviceLocationController.updateServiceLocationByID);


module.exports = router;