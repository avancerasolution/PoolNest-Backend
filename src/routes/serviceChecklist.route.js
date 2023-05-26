const express = require("express")
const router = express.Router();
const { serviceChecklistController } = require("../controllers")
const validate = require("../middleware/validate");
const serviceChecklistValidation = require("../validations/serviceChecklist.validation");
const { verify } = require("../middleware/auth");



/**
 * @swagger
 * /api/serviceChecklist:
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
    .get(verify(), validate(serviceChecklistValidation.getServiceChecklists), serviceChecklistController.getServiceChecklists)
    .post(verify(), validate(serviceChecklistValidation.createServiceChecklist), serviceChecklistController.createServiceChecklist)
router.route("/:id")
    .get(verify(), validate(serviceChecklistValidation.getServiceChecklist), serviceChecklistController.getServiceChecklist)
    .delete(verify(), validate(serviceChecklistValidation.getServiceChecklist), serviceChecklistController.deleteAllServiceChecklists)
    .patch(verify(), validate(serviceChecklistValidation.updateServiceChecklist), serviceChecklistController.updateServiceChecklistByID);

module.exports = router;
