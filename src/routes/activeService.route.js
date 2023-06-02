const express = require("express")
const router = express.Router();
const { activeServiceController } = require("../controllers")
const validate = require("../middleware/validate");
const activeServiceValidation = require("../validations/activeService.validation");
const { verify } = require("../middleware/auth");
const upload = require("../middleware/multer")



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
        , validate(activeServiceValidation.getActiveServices)
        , activeServiceController.getActiveServices)
    .post(
        verify()
        , validate(activeServiceValidation.createActiveService)
        , activeServiceController.createActiveService)

router.route("/createMany")
    .post(
        verify()
        , validate(activeServiceValidation.createActiveServices)
        , activeServiceController.createActiveServices)

router.route("/:id")
    .get(
        verify()
        , validate(activeServiceValidation.getActiveService)
        , activeServiceController.getActiveService)
    .delete(
        verify()
        , validate(activeServiceValidation.getActiveService)
        , activeServiceController.deleteActiveServiceByID)
    .patch(
        verify()
        , upload.array("media", 5)
        , validate(activeServiceValidation.updateActiveService)
        , activeServiceController.updateActiveServiceByID);



module.exports = router;
