const express = require('express');
const mongoose = require('mongoose');
const cookieSesson = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
   cookieSesson({
       maxAge:30 * 24 * 60 * 60 * 1000,
       keys: [keys.cookieKey]
   })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
