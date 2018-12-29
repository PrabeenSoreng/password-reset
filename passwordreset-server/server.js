const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const auth = require('./routes/auth');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', auth);

mongoose.connect('mongodb://localhost:27017/pwdresetApp', { useNewUrlParser: true })
    .then(() => {
        app.listen(3000, () => console.log('MongoDb connected and server listening on port 3000'))
    })
    .catch(err => console.log(err));