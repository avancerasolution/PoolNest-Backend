const express = require("express")
const router = express.Router();
const { equipmentController } = require("../controllers")
const validate = require("../middleware/validate");
const equipmentValidation = require("../validations/equipment.validation");
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
    .get(
        verify()
        , validate(equipmentValidation.getEquipments)
        , equipmentController.getEquipments)
    .post(
        verify()
        , validate(equipmentValidation.createEquipment)
        , equipmentController.createEquipment)

router.route("/createMany")
    .post(
        verify()
        , validate(equipmentValidation.createEquipments)
        , equipmentController.createEquipments)

router.route("/:id")
    .get(
        verify()
        , validate(equipmentValidation.getEquipment)
        , equipmentController.getEquipment)
    .delete(
        verify()
        , validate(equipmentValidation.getEquipment)
        , equipmentController.deleteEquipmentByID)
    .patch(
        verify()
        , validate(equipmentValidation.updateEquipment)
        , equipmentController.updateEquipmentByID);

module.exports = router;
