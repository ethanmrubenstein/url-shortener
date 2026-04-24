const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const ID_LENGTH = process.env.ID_LENGTH || 10;

const UrlSchema = new mongoose.Schema(
  {
    full: {
      type: String,
      match:
        /^(https?:\/\/)?([\da-zA-Z.-]+)\.([a-zA-Z.]{2,6})(:\d+)?(\/[^\s]*)?$/,
      required: true,
    },
    slug: {
      type: String,
      default: () => nanoid(ID_LENGTH),
      unique: true,
      maxLength: 10,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    lastClickedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Url", UrlSchema);
