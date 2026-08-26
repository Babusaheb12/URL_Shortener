
const express = require ('express');

const router = express.Router();

const {handleGenrateNewShortUrl} = require('../controllers/url')


router.post('/', handleGenrateNewShortUrl);

module.exports =router;