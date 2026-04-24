const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const ID_LENGTH = process.env.ID_LENGTH || 10;

const UrlSchema = new mongoose.Schema({
  full: {
    type: String,
    match: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
    required: true,
  },
  slug: {
    type: String,
    default: nanoid(ID_LENGTH),
    maxLength: 10,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  lastClickedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Url", UrlSchema);
