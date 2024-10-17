function isAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ error: "Authorization Error!!!" });
  }
  next();
}

module.exports = { isAuth };
