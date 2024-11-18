const mongoose = require("mongoose");
const RecipientSchema = require("./recipient");
const { Schema } = mongoose;

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "users" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const survey = mongoose.model("survey", surveySchema);

module.exports = survey;
