const express = require("express")
const router = express.Router();
const { readingController } = require("../controllers");
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
    .get(verify(), readingController.getReadings)
    .post(verify(), readingController.createReading)
router.route("/:id")
    .get(verify(), readingController.getReading)
    .delete(verify(), readingController.deleteReadingByID)
    .patch(verify(), readingController.updateReadingByID);




module.exports = router;
