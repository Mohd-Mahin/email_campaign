const express = require("express");
const router = express.Router();
const passport = require("passport");

const keys = require("../config/keys");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect(keys.HOST_KEY + "/surveys");
});

module.exports = router;
