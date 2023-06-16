const express = require("express")
const router = express.Router();
const { workOrderController } = require("../controllers");
const { verify } = require("../middleware/auth");
const validate = require("../middleware/validate");
const workOrderValidation = require("../validations/workOrder.validation")
const upload = require("../middleware/multer")




/**
 * @swagger
 * /api/workOrder:
 *  get:
 *      summary: dont Get All workOrders
 *      description: This is description
 *      responses:
 *          200:
 *              description: will list all the workOrder
 *          
 *  post:
 *      summary: Create workOrder
 *      description: This is desciption
 *      responses:
 *          201:
 *              description: Will create workOrder based on the given field
 *          401:
 *              description: Invalid token
 *          400:
 *              description: Bad Fields
 * 
 */
router.route("/")
    .get(verify(), validate(workOrderValidation.getWorkOrders), workOrderController.getWorkOrders)
    .post(verify(), validate(workOrderValidation.createWorkOrder), workOrderController.createWorkOrder)

router.route("/complete/:id").post(verify(), upload.array("media", 5), validate(workOrderValidation.completeWorkOrderByID), workOrderController.completeWorkOrderByID);


router.route("/:id")
    .get(verify(), validate(workOrderValidation.getWorkOrder), workOrderController.getWorkOrder)
    .delete(verify(), validate(workOrderValidation.getWorkOrder), workOrderController.deleteWorkOrderByID)
    .patch(verify(), validate(workOrderValidation.updateWorkOrder), workOrderController.updateWorkOrderByID);

module.exports = router