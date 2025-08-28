const router = require("express").Router()
const customerRoutes = require("./customer.routes")
const regionRouter = require("./region.routes")
const water_productsRouter = require("./water_products.routes")
const addresRouter = require("./addres.routes")
const delevry_staffRouter = require("./delevry_staff.routes")


router.use("/customer", customerRoutes)
router.use("/region", regionRouter)
router.use("/water_products", water_productsRouter)
router.use("/addres", addresRouter)
router.use("/delevry", delevry_staffRouter)

module.exports = router 