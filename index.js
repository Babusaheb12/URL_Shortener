const express =require('express');
const urlRouts = require ('./routes/url')
const staticRouter = require('./routes/staticRouter');
const connectToDatabase = require ('./config/connect');
const URL = require('./model/url');


/// set ejs
const path = require("path");

const app =express();
const PORT= 8002
app.use(express.json());
app.use(express.urlencoded({extended : false}))

/// connect the mongoose with databases..
connectToDatabase("mongodb+srv://babusaheb:Babu%40123@cluster0.nk1ixks.mongodb.net/Users?retryWrites=true&w=majority")
.then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });

    // setup ejs....
    app.set ("view engine", "ejs");

    app.set ('views', path.resolve("./views"));
    
    // app.get("/test", async(req,res)=>{
    //     const allUrl = await URL.find({});
    //     return res.render('home', {
    //         urls :allUrl
    //     })
    // });

// routs..

app.use('/url', urlRouts),
/// static routers..

app.use("/", staticRouter)

app.get('/:shordId', async(req, res)=>{
    const shortId = req.params.shordId;
    
   const entry = await URL.findOneAndUpdate({

          shortId: shortId 
    },{
        $push: {
            visitHistory: {
                timestamp : Date.now()
            }
        }
    });

    if (!entry) {
        return res.status(404).json({ error: 'Short URL not found' });
    }

    res.redirect(entry.redirectUrl)
})




app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})