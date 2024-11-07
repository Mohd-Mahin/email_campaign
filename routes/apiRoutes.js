const express = require("express");
const { isAuth } = require("../middleware/auth");
const router = express.Router();

router.get("/logout", (req, res, next) => {
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
router.post("/create-checkout-session", isAuth, async (req, res) => {
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
router.post("/create-payment-intent", async (req, res) => {
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

router.get("/user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
