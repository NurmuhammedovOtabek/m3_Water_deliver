const { addPayment, getPayments, getOnePeyment, updatePayment, delPayment } = require("../controllers/payments.controller")

const router = require("express").Router()

router.post("/", addPayment)
router.get("/", getPayments)
router.get("/:id", getOnePeyment)
router.patch("/:id", updatePayment)
router.delete("/:id", delPayment)

module.exports = router