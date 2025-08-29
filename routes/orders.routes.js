const { addOrders, getOrders, getOneOrders, updateOrders, delOrders } = require("../controllers/orders.controller")

const router = require("express").Router()

router.post("/", addOrders)
router.get("/", getOrders)
router.get("/:id", getOneOrders)
router.patch("/:id", updateOrders)
router.delete("/:id", delOrders) 

module.exports = router