const express = require("express")
const router = express.Router();
const { workOrderTypeController } = require("../controllers")


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

router.route("/").get(workOrderTypeController.getWorkOrderTypes).post(workOrderTypeController.createWorkOrderType)

router.route("/:id").get(workOrderTypeController.getWorkOrderType).delete(workOrderTypeController.deleteWorkOrderTypeByID).patch(workOrderTypeController.updateWorkOrderTypeByID);


module.exports = router;