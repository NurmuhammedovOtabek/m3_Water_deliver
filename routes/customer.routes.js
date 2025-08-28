const {
  addCustomer,
  getCustomer,
  getOneCustomer,
  filtrOne,
  updateCustomer,
  delCustomer,
} = require("../controllers/customer.controller");

const router = require("express").Router();

router.post("/", addCustomer);
router.get("/", getCustomer);
router.get("/filter", filtrOne);
router.get("/:id", getOneCustomer);
router.patch("/:id", updateCustomer);
router.delete("/:id", delCustomer);

module.exports = router;
