const { addDelevry_staff, getDelevry_staff, getOneDelevry } = require("../controllers/delevry_staff.controller")

const router = require("express").Router()

router.post("/", addDelevry_staff)
router.get("/", getDelevry_staff)
router.get("/:id", getOneDelevry)

module.exports = router