const express = require("express")
const router = express.Router();
const { itemNeededController } = require("../controllers")
const validate = require("../middleware/validate");
const itemNeededValidation = require("../validations/itemsNeeded.validation");
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
        , validate(itemNeededValidation.getItemsNeeded)
        , itemNeededController.getItemsNeeded)
    .post(
        verify()
        , validate(itemNeededValidation.createItemNeeded)
        , itemNeededController.createItemNeeded)

router.route("/createMany")
    .post(
        verify()
        , validate(itemNeededValidation.createItemsNeeded)
        , itemNeededController.createItemsNeeded)

router.route("/:id")
    .get(
        verify()
        , validate(itemNeededValidation.getItemNeeded)
        , itemNeededController.getItemNeeded)
    .delete(
        verify()
        , validate(itemNeededValidation.getItemNeeded)
        , itemNeededController.deleteItemsNeededByID)
    .patch(
        verify()
        , validate(itemNeededValidation.updateItemsNeeded)
        , itemNeededController.updateItemNeededByID);


module.exports = router;
