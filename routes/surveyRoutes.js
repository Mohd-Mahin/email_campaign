const express = require("express");
const { Path } = require("path-parser");
const _ = require("lodash");
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

router.get("/surveys", isAuth, async (req, res) => {
  const survey = await Survey.find({
    _user: req.user.id,
  }).select({ recipients: 0 });

  res.send(survey);
});

router.get("/surveys/:surveyId/:response", (req, res) => {
  res.send("Thanks for voting!!!");
});

router.post("/surveys/webhook", (req, res) => {
  console.log(req.body, "webhook data");
  // code approach - 1
  // const filteredData = req.body
  //   .map((webhookData) => {
  //     const { url, email } = webhookData;
  //     if (url) {
  //       const urlObj = new URL(url);
  //       const p = new Path("/api/surveys/:surveyId/:response");
  //       const pathName = urlObj.pathname;
  //       const { surveyId, response } = p.test(pathName);
  //       if (surveyId && response)
  //         return {
  //           surveyId,
  //           email,
  //           choice: response,
  //         };
  //     }
  //   })
  //   .filter((f) => f);

  // const updatedArray = Array.from(
  //   new Map(filteredData.map((d) => [d.surveyId, d])).values()
  // );

  // code approach - 2
  const p = new Path("/api/surveys/:surveyId/:response");
  _.chain(req.body)
    .map(({ url, email }) => {
      const pathName = new URL(url).pathname;
      const match = p.test(pathName);
      if (match)
        return {
          surveyId: match.surveyId,
          email,
          choice: match.response,
        };
    })
    .compact()
    .uniqBy("surveyId", "email")
    .each(async ({ surveyId, email, choice }) => {
      await Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false },
          },
        },
        {
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true },
          updatedAt: new Date(),
        }
      );
    })
    .value();

  res.send();
});

module.exports = router;
