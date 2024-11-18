const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const { MONGO_URI, COOKIE_KEY } = require("./config/keys");

mongoose.connect(MONGO_URI).then(() => console.log("Mongo db Connected!"));

const app = express();

require("./services/passport");

const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");
const surveyRoutes = require("./routes/surveyRoutes");

app.use(express.json());
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
app.use("/api", billingRoutes);
app.use("/api", surveyRoutes);

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("cliient/build"));

  const path = require("path");
  app.use(express.static("client/build"));

  const filePath = path.join(__dirname, "client", "build", "index.html");
  app.get("*", (req, res) => {
    res.sendFile(filePath);
  });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
