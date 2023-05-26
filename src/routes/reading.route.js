const express = require("express")
const router = express.Router();
const { readingController } = require("../controllers");
const { verify } = require("../middleware/auth");
const validate = require("../middleware/validate")
const readingValidation = require("../validations/reading.validation")

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
    .get(verify(), validate(readingValidation.getReadings), readingController.getReadings)
    .post(verify(), validate(readingValidation.createReading), readingController.createReading)
router.route("/:id")
    .get(verify(), validate(readingValidation.getReading), readingController.getReading)
    .delete(verify(), validate(readingValidation.getReading), readingController.deleteReadingByID)
    .patch(verify(), validate(readingValidation.updateReading), readingController.updateReadingByID);



module.exports = router;
