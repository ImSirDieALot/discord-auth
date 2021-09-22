const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const DiscordUser = require('../models/DiscordUser');

passport.serializeUser((user, done) => {
  console.log('serialize', user);
  done(user.id, null);
});

passport.deserializeUser((id, done) => {

})
passport.use(new DiscordStrategy({
  clientID : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET,
  callbackURL : process.env.CLIENT_REDIRECT,
  scope:['identify', 'guilds']
}, async (accessToken, refreshToken, profile, cb) => {
  console.log(profile.guilds.length);
  try {
    const user = await DiscordUser.findOne({
      discordId: profile.id
    });
    if(user) {
      done(null, user);
    } else {
      const newUser = await DiscordUser.create({
        discordId: profile.id,
        username: profile.username
      });

      const savedUser = await newUser.save();
      done(null, savedUser);
    }
  } catch(err) {
    console.log(err);
    done(err, null);
  }
}));