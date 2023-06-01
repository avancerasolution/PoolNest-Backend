const express = require("express");
const userRoute = require("./user.routes")
const workOrderTypeRoute = require("./workOrderType.route")
const customerRoute = require("./customer.route")
const shoppingItemRoute = require("./shoppingItem.route")
const dosageRoute = require("./dosage.route")
const readingRoute = require("./reading.route")
const authRoute = require("./auth.route")
const serviceChecklistRoute = require("./serviceChecklist.route")
const serviceLocationRoute = require("./serviceLocation.route")
const waterbodyRoute = require("./waterbody.route")
const serviceRoute = require("./service.route")
const workOrderRoute = require("./workOrder.route")
const equipmentRoute = require("./equipment.route")
const itemNeededRoute = require("./itemNeeded.route")
const router = express.Router();

router.use("/user", userRoute)
router.use("/workOrderType", workOrderTypeRoute)
router.use("/customer", customerRoute)
router.use("/shoppingItem", shoppingItemRoute)
router.use("/dosage", dosageRoute)
router.use("/reading", readingRoute)
router.use("/auth", authRoute)
router.use("/serviceChecklist", serviceChecklistRoute)
router.use("/serviceLocation", serviceLocationRoute)
router.use("/waterbody", waterbodyRoute)
router.use("/service", serviceRoute)
router.use("/workOrder", workOrderRoute)
router.use("/equipment", equipmentRoute)
router.use("/itemNeeded", itemNeededRoute)


module.exports = router;