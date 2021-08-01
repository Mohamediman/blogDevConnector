const path = require('path')
const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
var cors = require('cors')

const app = express();

app.use(cors())

const UsersRoutes = require('./routes/usersRoutes');
const ProfileRoutes = require('./routes/profileRoutes');
const PostRoutes = require('./routes/postRoutes');
const { resolve } = require('path');


//app.use(express.json());
app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/users', UsersRoutes);
app.use('/api/v1/profile', ProfileRoutes);
app.use('/api/v1/post', PostRoutes);

//===Set static files in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

module.exports = app;



