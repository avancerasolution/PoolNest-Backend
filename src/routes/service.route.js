const express = require("express")
const router = express.Router();
const { serviceController } = require("../controllers")
const validate = require("../middleware/validate");
const serviceValidation = require("../validations/service.validation");
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
router.route("/")
    .get(verify(), validate(serviceValidation.getServices), serviceController.getServices)
    .post(verify(), validate(serviceValidation.createService), serviceController.createService)



router.route("/:id")
    .get(verify(), validate(serviceValidation.getService), serviceController.getService)
    .delete(verify(), validate(serviceValidation.getService), serviceController.deleteServiceByID)
    .patch(verify(), validate(serviceValidation.updateService), serviceController.updateServiceByID);

module.exports = router;
