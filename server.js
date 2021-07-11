const PORT = process.env.PORT || 5000

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// COnnect to Mongo
mongoose
    .connect(db, { useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log(`Database connected!!!`))
    .catch(err => console.log(err));

// Bodyparser Middleware
app.use(bodyParser.json());

app.use('/api/items', items);

// Serve static assets if in production
if(process.env.NODE_ENV == 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
})