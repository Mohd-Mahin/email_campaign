const sendGrid = require("@sendgrid/mail");

const keys = require("../config/keys");

sendGrid.setApiKey(keys.sendGridKey);

class Mailer {
  constructor({ subject, recipients }, content) {
    this.recipients = recipients.map(({ email }) => email);
    this.isMultiple = true;

    if (this.recipients.length === 1) {
      this.recipients = this.recipients[0];
      this.isMultiple = false;
    }

    this.email = {
      to: this.recipients,
      from: "mahinit3016@gmail.com",
      subject: subject,
      html: content,
      tracking_settings: {
        click_tracking: {
          enable: true,
          enable_text: true,
        },
      },
      isMultiple: this.isMultiple,
    };
  }

  async send() {
    try {
      if (!this.recipients.length) {
        return null;
      }
      console.log(this.email);
      return await sendGrid.send(this.email);
    } catch (error) {
      console.error(error.response.body.errors);
      console.error(error);
    }
  }
}

module.exports = Mailer;
