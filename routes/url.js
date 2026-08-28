
const express = require ('express');

const router = express.Router();

const {handleGenrateNewShortUrl, handleGetAnalytics} = require('../controllers/url')


router.post('/', handleGenrateNewShortUrl);

router.get('/analytics/:shortID', handleGetAnalytics)

module.exports =router;