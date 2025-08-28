const { createAddres, getAddres, getByIdA, updateAddres, delAddres } = require("../controllers/addres.controller");

const router = require("express").Router();


router.post("/", createAddres)
router.get("/", getAddres)
router.get("/:id", getByIdA)
router.patch("/:id", updateAddres)
router.delete("/:id", delAddres)

module.exports = router