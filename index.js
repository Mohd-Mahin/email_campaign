const express = require("express");
const mongoose = require("mongoose");
// const cookieSession = require("cookie-session");
const session = require("express-session");
const passport = require("passport");

const Stripe = require("stripe");
const keys = require("./config/keys");

const stripe = Stripe(keys.stripeSecretKey);
const { MONGO_URI, COOKIE_KEY } = require("./config/keys");

mongoose.connect(MONGO_URI).then(() => console.log("Mongo db Connected!"));

const app = express();

require("./services/passport");

const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");
const { isAuth } = require("./middleware/auth");

// app.use(
//   cookieSession({
//     expires: 30 * 24 * 60 * 60 * 1000,
//     keys: [COOKIE_KEY],
//   })
// );
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
app.use("/api", apiRoutes);

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
