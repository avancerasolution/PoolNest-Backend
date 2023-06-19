const express = require("express")
const router = express.Router();
const { emailDetailController } = require("../controllers")
const validate = require("../middleware/validate");
const emailDetailValidation = require("../validations/emailDetails.validation");
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
    .get(verify(), validate(emailDetailValidation.getEmailDetails), emailDetailController.getEmailDetails)
    .post(verify(), upload.single("logo"), validate(emailDetailValidation.createEmailDetail), emailDetailController.createEmailDetail)

// router.route("/createMany")
//     .post(
//         verify()
//         , validate(emailDetailValidation.createEmailDetails)
//         , emailDetailController.createemailDetails)

router.route("/:id")
    .get(verify(), validate(emailDetailValidation.getEmailDetail), emailDetailController.getEmailDetail)
    .delete(verify(), validate(emailDetailValidation.getEmailDetail), emailDetailController.deleteEmailDetailByID)
    .patch(verify(), upload.single("logo"), validate(emailDetailValidation.updateEmailDetail), emailDetailController.updateEmailDetailByID);

module.exports = router;
