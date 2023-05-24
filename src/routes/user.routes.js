const express = require("express")
const router = express.Router();
const { userController } = require("../controllers")






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
router.route("/").get(userController.getUsers).post(userController.createUser)

router.route("/:id").get(userController.getUser).delete(userController.deleteAllUsers).patch(userController.updateUserByID);


module.exports = router;