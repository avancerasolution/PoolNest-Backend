const express = require("express")
const router = express.Router();
const { waterbodyController } = require("../controllers")
const { verify } = require("../middleware/auth")
const validate = require("../middleware/validate")
const waterbodyValidation = require("../validations/waterbody.validation")


/**
 * @swagger
 * /api/waterbody:
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
    .get(verify(), validate(waterbodyValidation.getWaterbodies), waterbodyController.getWaterbodies)
    .post(verify(), validate(waterbodyValidation.createWaterbody), waterbodyController.createWaterbody)

router.route("/:id")
    .get(verify(), validate(waterbodyValidation.getWaterbody), waterbodyController.getWaterbody)
    .delete(verify(), validate(waterbodyValidation.getWaterbody), waterbodyController.deleteWaterbodyByID)
    .patch(verify(), validate(waterbodyValidation.updateWaterbody), waterbodyController.updateWaterbodyByID);


module.exports = router;