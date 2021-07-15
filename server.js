const PORT = process.env.PORT || 5000

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();

// DB Config
const db = config.get('mongoURI');

// COnnect to Mongo
mongoose
    .connect(db, { useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log(`Database connected!!!`))
    .catch(err => console.log(err));

// Bodyparser Middleware
app.use(express.json());

app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);

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