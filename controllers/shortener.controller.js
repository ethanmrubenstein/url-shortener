const Url = require("../models/Url");

exports.shortener = async (req, res) => {
  const fullUrl = req.query.url;

  const shortenedUrl = await Url.create({ full: fullUrl });

  const baseUrl =
    process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
  res.send(`${baseUrl}/${shortenedUrl.slug}`);
};
