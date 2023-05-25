const express = require("express")
const router = express.Router();
const { userController } = require("../controllers");
const { verify } = require("../middleware/auth");






/**
 * @swagger
 * /api/user:
 *  get:
 *      summary: Get All Users
 *      description: this is description
 *      responses:
 *          200:
 *              description: will list all the user
 *          
 * 
 */
router.route("/").get(verify(), userController.getUsers).post(verify(), userController.createUser)

router.route("/:id").get(verify(), userController.getUser).delete(userController.deleteUserByID).patch(verify(), userController.updateUserByID);


module.exports = router;