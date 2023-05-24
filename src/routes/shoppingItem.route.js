const express = require("express")
const router = express.Router();
const { shoppingItemController } = require("../controllers")
const upload = require("../middleware/multer")

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
router.route("/").get(shoppingItemController.getShoppingItems).post(upload.array("product_image", 3), shoppingItemController.createShoppingItem)

router.route("/:id").get(shoppingItemController.getShoppingItem).delete(shoppingItemController.deleteShoppingItemByID).patch(upload.array("product_image", 3), shoppingItemController.updateShoppingItemByID);


module.exports = router;