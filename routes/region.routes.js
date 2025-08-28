const {
  createRegion,
  getRegion,
  getById,
  filtrOneR,
  updateRegion,
  delREgion,
} = require("../controllers/region.controller");

const router = require("express").Router();

router.post("/", createRegion);
router.get("/", getRegion);
router.get("/filtr", filtrOneR);
router.get("/:id", getById);
router.patch("/:id", updateRegion);
router.delete("/:id", delREgion);

module.exports = router;
