const mongoose = require('mongoose');

const DBConnect = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"));
}

module.exports = DBConnect;