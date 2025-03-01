const { verification } = require("../Controller/verifyEmail-controller");

const router = require("express").Router();

router.post("/verifyemail", verification);
module.exports = router;
