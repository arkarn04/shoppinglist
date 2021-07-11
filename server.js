const PORT = process.env.PORT || 5000

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
})