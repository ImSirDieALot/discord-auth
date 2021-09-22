require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session')
const passport = require('passport')
const PORT = process.env.PORT || 3333;
const DiscordStrategy = require('./strategies/discordstrategy');
const db = require('./database/database');

db.then(() => console.log('Connected to DB')).catch(err => console.log(err));

// ROUTES
const authRouter = require('./routes/auth');

app.use(session({
  secret:'random secret',
  cookie: {
    maxAge: 60000 * 60 * 24
  },
  saveUninitialized: false
}))

// Passport
app.use(passport.initialize());
app.use(passport.session());

// MIDDLEWARE
app.use('/auth', authRouter);


// SERVER STARTED
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
})