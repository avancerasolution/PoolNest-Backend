const express = require("express");
const userRoute = require("./user.routes")
const workOrderTypeRoute = require("./workOrderType.route")
const customerRoute = require("./customer.route")
const shoppingItemRoute = require("./shoppingItem.route")
const dosageRoute = require("./dosage.route")
const readingRoute = require("./reading.route")
const authRoute = require("./auth.route")
const router = express.Router();

router.use("/user", userRoute)
router.use("/workOrderType", workOrderTypeRoute)
router.use("/customer", customerRoute)
router.use("/shoppingItem", shoppingItemRoute)
router.use("/dosage", dosageRoute)
router.use("/reading", readingRoute)
router.use("/auth", authRoute)


module.exports = router;