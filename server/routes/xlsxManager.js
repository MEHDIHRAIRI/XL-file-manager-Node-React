const router = require("express").Router();
const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { linkFile, updateExcelFile } = require("../controller/fileManager");

router.put("/", auth, linkFile);
router.put("/update", auth, updateExcelFile);

module.exports = router;
