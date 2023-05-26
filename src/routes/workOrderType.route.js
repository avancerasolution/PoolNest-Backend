const express = require("express")
const router = express.Router();
const { workOrderTypeController } = require("../controllers")
const { verify } = require("../middleware/auth")
const validate = require("../middleware/validate")
const workOrderTypeValidation = require("../validations/workOrderType.validation")


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
    .get(verify(), validate(workOrderTypeValidation.getWorkOrderTypes), workOrderTypeController.getWorkOrderTypes)
    .post(verify(), validate(workOrderTypeValidation.createWorkOrderType), workOrderTypeController.createWorkOrderType)

router.route("/:id")
    .get(verify(), validate(workOrderTypeValidation.getWorkOrderType), workOrderTypeController.getWorkOrderType)
    .delete(verify(), validate(workOrderTypeValidation.getWorkOrderType), workOrderTypeController.deleteWorkOrderTypeByID)
    .patch(verify(), validate(workOrderTypeValidation.updateWorkOrderType), workOrderTypeController.updateWorkOrderTypeByID);


module.exports = router;