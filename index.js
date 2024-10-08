const express = require("express");
const mongoose = require("mongoose");
// const cookieSession = require("cookie-session");
const session = require("express-session");
const passport = require("passport");

const { MONGO_URI, COOKIE_KEY } = require("./config/keys");

mongoose.connect(MONGO_URI).then(() => console.log("Mongo db Connected!"));

const app = express();

require("./services/passport");

const authRoutes = require("./routes/authRoutes");

// app.use(
//   cookieSession({
//     expires: 30 * 24 * 60 * 60 * 1000,
//     keys: [COOKIE_KEY],
//   })
// );
app.use(
  session({
    secret: COOKIE_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);

app.get("/api/logout", (req, res, next) => {
  req.session.user = null;
  req.session.save(function (err) {
    if (err) next(err);

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err);
      res.redirect("/");
    });
  });
});

app.get("/api/user", (req, res) => {
  res.send(req.user);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
