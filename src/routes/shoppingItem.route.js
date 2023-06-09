const express = require("express")
const router = express.Router();
const { shoppingItemController } = require("../controllers")
const upload = require("../middleware/multer");
const { verify } = require("../middleware/auth");

const uploadOptions = {}



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
router.route("/").get(verify(), shoppingItemController.getShoppingItems).post(verify(), upload.array("product_image", 3), shoppingItemController.createShoppingItem)

router.route("/:id")
    .get(verify(), shoppingItemController.getShoppingItem)
    .delete(verify(), shoppingItemController.deleteShoppingItemByID)
    .patch(verify(), upload.array("product_image", 3), shoppingItemController.updateShoppingItemByID);


module.exports = router;