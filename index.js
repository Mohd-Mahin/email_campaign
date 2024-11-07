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

// payment approach 1 with page reloading
app.post("/api/create-checkout-session", isAuth, async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Add Credits",
              description: "Add 5$ for 5credits",
              images: ["https://dummyimage.com/600x400/000/fff"],
            },
            unit_amount: 500, // Amount in cents ($50.00)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: keys.HOST_KEY + "/surveys", // Adjust to your success page
      cancel_url: keys.HOST_KEY + "/surveys", // Adjust to your cancel page
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send({ ...user, sessionId: session.id });
  } catch (error) {
    res.status(500).send(error);
  }
});

// payment approach 2 without page reloading
app.post("/api/create-payment-intent", async (req, res) => {
  console.log(req.body, typeof req.body);
  const { paymentMethodId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 500, // Amount in cents ($50.00)
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send({ success: true, ...user });
  } catch (error) {
    res.send({ error: error.message });
  }
});

app.get("/api/user", (req, res) => {
  res.send(req.user);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("cliient/build"));

  const root = require("path").join(__dirname, "client", "build");
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
  });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
