const express = require("express");

const router = express.Router();

const { handleUserSignup, handleUserlogin } = require("../controllers/user");

// Register account router
router.post("/", handleUserSignup);


router.post("/login", handleUserlogin);

module.exports = router;