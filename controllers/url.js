
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

    const allUrl = await URL.find({});

    return res.render('home', {
        id: shortID,
        urls: allUrl,
    });
    // return res.json({ id : shortID})

}

async function handleGetAnalytics(req, res) {
    const shortId =req.params.shortID;
    const result =await URL.findOne({shortId: shortId});
    return res.json({
        totalClicks : result.visitHistory.length, 
        analytics : result.visitHistory,
    })
    
}

module.exports = {
    handleGenrateNewShortUrl,
    handleGetAnalytics
}