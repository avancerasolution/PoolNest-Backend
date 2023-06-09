const express = require("express")
const router = express.Router();
const { activeWorkOrderController } = require("../controllers")
const validate = require("../middleware/validate");
const activeWorkOrderValidation = require("../validations/activeWorkOrder.validation");
const { verify } = require("../middleware/auth");



/**
 * @swagger
 * /api/activeWorkOrder:
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
    .get(verify(), validate(activeWorkOrderValidation.getActiveWorkOrders), activeWorkOrderController.getActiveWorkOrders)
// .post(verify(), validate(activeWorkOrderValidation.createactiveWorkOrder), activeWorkOrderController.createActiveWorkOrder)

// router.route("/createMany")
//     .post(verify(), validate(activeWorkOrderValidation.createactiveWorkOrders), activeWorkOrderController.createActiveWorkOrder)



router.route("/:id")
    .get(verify(), validate(activeWorkOrderValidation.getActiveWorkOrder), activeWorkOrderController.getActiveWorkOrder)
    .delete(verify(), validate(activeWorkOrderValidation.getActiveWorkOrder), activeWorkOrderController.deleteAllActiveWorkOrders)
    .patch(verify(), validate(activeWorkOrderValidation.updateActiveWorkOrder), activeWorkOrderController.updateActiveWorkOrderByID);

module.exports = router;