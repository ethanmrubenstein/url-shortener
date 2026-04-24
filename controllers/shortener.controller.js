const Url = require("../models/Url");

exports.shortener = async (req, res) => {
  const fullUrl = req.query.url;

  const shortenedUrl = await Url.create({ full: fullUrl });

  res.send(`http://localhost:3000/${shortenedUrl.slug}`);
};
