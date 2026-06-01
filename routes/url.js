const express = require('express');
const router = express.Router();
const {handleGenerateNewShortURL,handleShortId,handleGetAnalytics}=require("../controllers/url")

router.post('/',handleGenerateNewShortURL);
router.get('/:shortId',handleShortId);
router.get('/analytics/:shortId',handleGetAnalytics)



module.exports = router;