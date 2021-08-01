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


//app.use(express.json());
app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/users', UsersRoutes);
app.use('/api/v1/profile', ProfileRoutes);
app.use('/api/v1/post', PostRoutes);


app.get('/', (req, res) => {
    res.send("Hello from the Home page");
})

module.exports = app;



