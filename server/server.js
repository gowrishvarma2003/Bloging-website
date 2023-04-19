import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import userdata from "./models/data.js"
import nodemailer from 'nodemailer';
import blogs from "./models/blogs.js";
// import mailgen from 'mailgen';
const app = express();
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// import GoogleStrategy from 'passport-google-oauth20';
// const findOrCreate = require('mongoose-findorcreate')
// import findOrCreate from "mongoose-findorcreate";

const dburl = "mongodb+srv://gowrish:nkpacmfb8m@alpha.h8dcwzs.mongodb.net/?retryWrites=true&w=majority";
app.use(cors({ origin: '*' }));
app.use(express.json());
app.listen(8000);

// mongoose.set("strictQuery",true);

// userSchema.plugin(findOrCreate);

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("connected..."))
    .catch((err) => console.log(err))

    // passport.use(new GoogleStrategy({
    //     clientID: "552054313980-3q1fkifsnotmgbheddtjkq910oest4ch.apps.googleusercontent.com",
    //     clientSecret: "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",
    //     callbackURL: "http://localhost:3000/auth/google/gowrishvarma",
    //     userProfileURL:"http://www.googleapis.com/oauth2/v3/userinfo"
    //   },
    //   function(accessToken, refreshToken, profile, cb) {
    //     User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //       return cb(err, user);
    //     });
    //   }
    // ));

app.post('/', async (req, res) => {
    const data = new userdata({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    data.save()
        .then(console.log("data saved"),
        res.json()
        )
        .catch(err => console.log(err))
})

// app.get("/auth/google",
// passport.authenticate('google', { scope: ["profile"] })
// );

// app.post('/',async(req,res)=>{
//     try{
//         const email = req.body.email;
//         const usermail = await userdata.findOne({email:email});

//         if(usermail===null){
//         if(usermail.email !== email){
//             const data = new userdata({
//                 name:req.body.name,
//                 email:req.body.email,
//                 password:req.body.password,
//             });

//             data.save()
//             .then(console.log("datasaved"))
//             .catch((err)=>console.log(err));
//         }
//         else{
//             console.log("user already exists");
//         }
//     }
//     }
//     catch(err){
//         console.log(err);
//     }
// });

app.use(express.json());
app.post('/login', async (req, res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;
        const usermail = await userdata.findOne({ email: email });
        if (password == usermail.password) {
            res.json({
                email,
                password,
            })
        }
    } catch (error) {
        res.status(400).send("invalid email");
    }
})

app.post('/password', async (req, res) => {
    const otpgenerated = Math.round(Math.random()*10000);
    const usermail = req.body.email;
    const userdatas = await userdata.findOne({ email: usermail });
    if (userdatas.email == usermail) {
        console.log("user found");

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'namburigowrish53222@gmail.com',
                pass: 'npmoswmgtqmswngu'
            }
        });

        let mailDetails = {
            from: 'namburigowrish53222@gmail.com',
            to: usermail,
            subject: 'Test mail',
            text: otpgenerated.toString()
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
                res.json({usermail , otpgenerated});
            }
        });
    }
})

app.post('/otpverify', async (req,res)=>{
    const generatedotp = req.body.wegetotp;
    const enteredotp = req.body.otp;

    res.json(
        {generatedotp,
        enteredotp}
    )
}) 

app.post("/resetpassword" , async(req,res)=>{
    const newpassword =req.body.newpassword;
    var email =req.body.email;
    
    try{
        const result = await userdata.updateOne({email} ,{
            $set:{
                password:newpassword
            }
        });
        if(result.acknowledged == true){
            res.json();
        }
    }
    catch(err){
        console.log(err);
    }
})

app.post('/newblog', async (req, res) => {
    const data = new blogs({
        title: req.body.title,
        body: req.body.body,
    })

    data.save()
        .then(console.log("data saved"),
        res.json()
        )
        .catch(err => console.log(err))
})

app.get('/home',async(req,res)=>{
    const data = await blogs.find({});
    res.send(data);
})