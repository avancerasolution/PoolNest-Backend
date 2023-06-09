const express = require("express")
const router = express.Router();
const { dosageController } = require("../controllers")
const validate = require("../middleware/validate");
const dosageValidation = require("../validations/dosage.validation");
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
    .get(verify(), validate(dosageValidation.getDosages), dosageController.getDosages)
    .post(verify(), validate(dosageValidation.createDosage), dosageController.createDosage)

router.route("/createMany")
    .post(
        verify()
        , validate(dosageValidation.createDosages)
        , dosageController.createDosages)

router.route("/:id")
    .get(verify(), validate(dosageValidation.getDosage), dosageController.getDosage)
    .delete(verify(), validate(dosageValidation.getDosage), dosageController.deleteDosageByID)
    .patch(verify(), validate(dosageValidation.updateDosage), dosageController.updateDosageByID);

module.exports = router;
