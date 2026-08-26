const express =require('express');
const urlRouts = require ('./routes/url')
const connectToDatabase = require ('./config/connect')

const app =express();
const PORT= 8002
app.use(express.json());

/// connect the mongoose with databases..
connectToDatabase("mongodb+srv://babusaheb:Babu%40123@cluster0.nk1ixks.mongodb.net/Users?retryWrites=true&w=majority")
.then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });

// routs..

app.use('/url', urlRouts),


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})