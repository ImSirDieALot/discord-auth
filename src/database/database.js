const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost:27017/discordauth', { useNewUrlParser: true, useUnifiedTopology: true });

// module.exports = mongoose.connect(
//   'mongodb+srv://admin:admin@cluster0.xbpmy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
//   { useNewUrlParser: true, useUnifiedTopology: true }
// )