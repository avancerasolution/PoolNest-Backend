const express = require("express");
const userRoute = require("./user.routes")
const workOrderTypeRoute = require("./workOrderType.route")
const customerRoute = require("./customer.route")
const shoppingItemRoute = require("./shoppingItem.route")
const router = express.Router();

router.use("/user", userRoute)
router.use("/workOrderType", workOrderTypeRoute)
router.use("/customer", customerRoute)
router.use("/shoppingItem", shoppingItemRoute)

module.exports = router;