function checkCredits(req, res, next) {
  if (req.user.credits === 0) {
    return res.status(402).send({ error: "Recharge. Credit is low!!!" });
  }
  next();
}

module.exports = { checkCredits };
