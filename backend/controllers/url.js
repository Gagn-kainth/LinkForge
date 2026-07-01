const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = nanoid(8);
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
}

async function handleShortId(req, res) {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true }
  );

  if (!entry) {
    return res.status(404).json({ error: "URL not found" });
  }

  return res.redirect(entry.redirectUrl);
}
async function handleGetAnalytics(req,res) {
    const shortId =req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks :result.visitHistory.length,  analytics : result.visitHistory})
    
}
async function handleGetAllUrls(req, res) {
  const results = await URL.find({}).sort({ createdAt: -1 });

  const urls = results.map((entry) => ({
    id: entry.shortId,
    redirectUrl: entry.redirectUrl,
    totalClicks: entry.visitHistory.length,
    createdAt: entry.createdAt,
  }));

  return res.json({ urls });
}


module.exports = {
  handleGenerateNewShortURL,
  handleShortId,
  handleGetAnalytics,
  handleGetAllUrls,
};
