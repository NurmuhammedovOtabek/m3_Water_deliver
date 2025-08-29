const { addOrders_I, getOrders_I, getOneOrders_I, updateOrders_I, delOrders_I } = require("../controllers/order_items.controller")

const router = require("express").Router()

router.post("/", addOrders_I)
router.get("/", getOrders_I)
router.get("/:id", getOneOrders_I)
router.patch("/:id", updateOrders_I)
router.delete("/:id", delOrders_I)

module.exports = router