const {
  addDelevry_staff,
  getDelevry_staff,
  getOneDelevry,
  updateDelevryS,
  delDelivrS,
} = require("../controllers/delevry_staff.controller");

const router = require("express").Router();

router.post("/", addDelevry_staff);
router.get("/", getDelevry_staff);
router.get("/:id", getOneDelevry);
router.patch("/:id", updateDelevryS);
router.delete("/:id", delDelivrS);

module.exports = router;
