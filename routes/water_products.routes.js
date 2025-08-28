const { addWater_product, getWater_P, getOneWater_P, filtrOneWP, updateWater_P, delWater_P } = require("../controllers/water_products.controller")

const router = require("express").Router()

router.post("/", addWater_product)
router.get("/", getWater_P)
router.get("/filtr", filtrOneWP)
router.get("/:id", getOneWater_P)
router.patch("/:id", updateWater_P)
router.delete("/:id", delWater_P)

module.exports = router