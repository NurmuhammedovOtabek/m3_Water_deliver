const router = require("express").Router()
const customerRoutes = require("./customer.routes")
const regionRouter = require("./region.routes")
const water_productsRouter = require("./water_products.routes")

router.use("/customer", customerRoutes)
router.use("/region", regionRouter)
router.use("/water_products", water_productsRouter)

module.exports = router