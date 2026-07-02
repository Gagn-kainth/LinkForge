const express = require("express");
const router = express.Router();
const {
  handleGenerateNewShortURL,
  handleShortId,
  handleGetAnalytics,
  handleGetMyUrls,
  handleDeleteUrl,
} = require("../controllers/url");
const { optionalAuth, requireAuth } = require("../middleware/auth");

router.post("/", optionalAuth, handleGenerateNewShortURL);
router.get("/mine", requireAuth, handleGetMyUrls);
router.delete("/:shortId", requireAuth, handleDeleteUrl);
router.get("/analytics/:shortId", handleGetAnalytics);
router.get("/:shortId", handleShortId);

module.exports = router;