const express = require("express")
const router = express.Router();
const { tagController } = require("../controllers")
const validate = require("../middleware/validate");
const tagValidation = require("../validations/tag.validation");
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
    .get(verify(), validate(tagValidation.getTags), tagController.getTags)
    .post(verify(), validate(tagValidation.createTag), tagController.createTag)

router.route("/createMany")
    .post(
        verify()
        , validate(tagValidation.createTags)
        , tagController.createTags)

router.route("/:id")
    .get(verify(), validate(tagValidation.getTag), tagController.getTag)
    .delete(verify(), validate(tagValidation.getTag), tagController.deleteTagByID)
    .patch(verify(), validate(tagValidation.updateTag), tagController.updateTagByID);

module.exports = router;
