const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/authestapp`)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('Connection Error:', err));



const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    age: Number
});

module.exports = mongoose.model("user", userSchema);