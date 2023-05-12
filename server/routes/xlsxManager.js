const router = require("express").Router();
const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { linkFile } = require("../controller/fileManager");

router.put("/", auth, linkFile);

module.exports = router;
