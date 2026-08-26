
const shortid = require('shortid');
const URL =require ('../model/url');


async function handleGenrateNewShortUrl(req, res){

    const { url } = req.body || {};
    if(!url){
        return res.status(400).json({ error: 'url is required' });
    }
    const shortID = shortid.generate();

    await URL.create({
        shortId: shortID,
        redirectUrl: url,
        visitHistory : []
    });

    return res.json({ id : shortID})

}

module.exports = {
    handleGenrateNewShortUrl
}