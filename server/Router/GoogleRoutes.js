// backend/routes/authRoutes.js
import passport from 'passport';
import { Router } from 'express';
import SendCookie from '../Utils/SendCookie.js';
import { CreateToken } from '../Utils/JWTtoken.js';
import transporter from '../Utils/Nodemailer.js';
import WelcomePage from '../Utils/Welcome.js';

const GoogleRoutes = Router();


const URL = process.env.FRONTEND_URL_LOCAL;

// Route for Google OAuth
GoogleRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Route for Google OAuth Callback
GoogleRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect:URL,
  }),
  (req, res) => {
    // const OTP = ()=> Math.floor(100000 + Math.random()*899999).toString()
        // const info =  transporter.sendMail({
        //     from: process.env.USER_EMAIL, // sender address
        //     to:email, // list of receivers
        //     subject:" Welcome To Bid - Deal", // Subject line
        //     text: "Thanks for Joining us", // plain text body
        //     html: WelcomePage(username,email,OTP()), // html body
        //   });
        //   console.log(info);
    // Send the user data and message to the frontend
    const token = CreateToken(req.user._id)
    SendCookie(res,token)
    req.session.user = req.user;
    console.log("its user ",req.user);
    res.redirect(URL)
  }
);
GoogleRoutes.get("/user", (req, res) => {
  console.log(req.session.user);
  
  if (req.session && req.session.user) {
    res.json({
      data: req.session.user,
      success: true,
      message:"signed in successfully"
    });
  } else {
    res.json({
      message: "No user found",
      success: false,
    });
  }
});
export default GoogleRoutes;
