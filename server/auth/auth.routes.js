const veriftySignUp = require("../middleware/verifySignUp");
const controller = require("../controllers/auth-controller");
const express = require("express");
const router = express.Router();

router.post("/signUp", [veriftySignUp.checkDuplicateEmail], controller.signUp);
router.post("/signIn", controller.signIn);

module.exports = router;
