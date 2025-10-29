const express = require('express');
const app = express();
const userModel = require("./models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');
const path = require('path');


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

const JWT_SECRET = "shhhhhhhhhh";

// Middleware to protect routes
function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.send("Please login first");

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.send("Invalid token, please login again");
    }
}
// Home page

app.get('/',( req, res) => {
    res.render('index');
})

// Create User

app.post('/create', ( req, res) => {
    let {username, email, password, age} = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async(err, hash) => {
            let createdUser = await userModel.create({
                username,
                email,
                password: hash,
                age
            });

            // const token = jwt.sign({ email: createdUser.email }, "shhhhhhhhhh");
            // res.cookie("token", token);
            // res.redirect("/profile");
            const token = jwt.sign({ email: createdUser.email }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
        res.redirect("/profile");


        })
    })

});


// Login page

app.get("/login", function (req, res) {
    res.render('login');
})

// Login User

app.post("/login", async function (req, res) {
    let user = await userModel.findOne({email: req.body.email});
    if(!user) return res.send("something went wrong");

    bcrypt.compare(req.body.password, user.password, function (err, result) {
        if(result) {
            const token = jwt.sign({ email: user.email }, "shhhhhhhhhh");
            res.cookie("token", token);
            return res.send("Yes! You are logged in");
        }
        else {
            return res.send("Incorrect email or password");
        }
    });
});

// Profile page (protected)
app.get("/profile", isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email });
    res.render("profile", { user });
});

//Logout User

app.get("/logout", function(req, res) {
    res.clearCookie("token");
    res.redirect("/");
});


app.listen(3000);