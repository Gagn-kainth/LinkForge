const express = require("express");
const router = express.Router();
const {
  handleGenerateNewShortURL,
  handleShortId,
  handleGetAnalytics,
  handleGetAllUrls,
} = require("../controllers/url");

router.post("/", handleGenerateNewShortURL);
router.get("/", handleGetAllUrls);
router.get("/analytics/:shortId", handleGetAnalytics);
router.get("/:shortId", handleShortId);

module.exports = router;
