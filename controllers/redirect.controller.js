const Url = require("../models/Url");

const DISCORD_USER_ID = process.env.DISCORD_USER_ID;
const CDN_URL = process.env.CDN_URL;
const ID_LENGTH = process.env.ID_LENGTH || 10;

exports.redirect = async (req, res) => {
  const SLUG = req.params.slug;

  if (SLUG.length > ID_LENGTH) {
    return res.redirect(
      `https://cdn.ethanthegreat.com/uploads/${DISCORD_USER_ID}/${SLUG}`,
    );
  }

  try {
    const shortenedUrl = await Url.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { clicks: 1 }, lastClickedAt: Date.now() },
    );
    res.redirect(shortenedUrl.full);
  } catch (error) {
    res.status(404).send("404 Not Found");
  }
};
