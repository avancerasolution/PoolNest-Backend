const express = require("express")
const router = express.Router();
const { userController } = require("../controllers");
const { verify } = require("../middleware/auth");
const validate = require("../middleware/validate");
const userValidation = require("../validations/user.validation")





/**
 * @swagger
 * /api/user:
 *  get:
 *      summary: dont Get All Users
 *      description: This is description
 *      responses:
 *          200:
 *              description: will list all the user
 *          
 *  post:
 *      summary: Create User
 *      description: This is desciption
 *      responses:
 *          201:
 *              description: Will create user based on the given field
 *          401:
 *              description: Invalid token
 *          400:
 *              description: Bad Fields
 * 
 */
router.route("/")
    .get(verify(), validate(userValidation.getUsers), userController.getUsers)
    .post(verify(), validate(userValidation.createUser), userController.createUser)

router.route("/:id")
    .get(verify(), validate(userValidation.getUser), userController.getUser)
    .delete(verify(), validate(userValidation.getUser), userController.deleteUserByID)
    .patch(verify(), validate(userValidation.updateUser), userController.updateUserByID);


module.exports = router;