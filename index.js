const express = require('express');
const connectToMongoDB = require('./connect'); // Import the connect function properly
const urlRoute = require('./routes/url');
const app = express();
const URL = require('./models/url');
const Port = 8001;

// Middleware to parse JSON
app.use(express.json());

// Replace with your MongoDB Atlas connection string
connectToMongoDB('mongodb+srv://harsh844988:HRRraojrIghTUpjD@cluster0.dpuge.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


app.use(express.json());

app.use('/url', urlRoute);

app.get('/:shortId',async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
    {
        $push:{
        visitHistory: 
        {
            timestamp:Date.now(),
        }
    },
}
);
res.redirect(entry.redirectURL);
});

app.listen(Port, () => console.log(`Server started at port ${Port} - listening`));
