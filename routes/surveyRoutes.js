const express = require("express");
const { isAuth } = require("../middleware/auth");
const { checkCredits } = require("../middleware/checkCredits");
const Survey = require("../models/survey");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplate/surveyTemplate");
const router = express.Router();

router.post("/surveys", isAuth, checkCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients
      .split(",")
      .map((recipient) => ({ email: recipient.trim() })),
    _user: req.user.id,
  });

  // send mail
  const mail = new Mailer(survey, surveyTemplate(survey));

  try {
    await mail.send();
    await survey.save();

    req.user.credits -= 1;
    const user = await req.user.save();

    res.send(user);
  } catch (error) {
    res.status(422).send(error);
  }
});

router.get("/surveys/thanks", (req, res) => {
  res.send("Thanks for voting!!!");
});

module.exports = router;
