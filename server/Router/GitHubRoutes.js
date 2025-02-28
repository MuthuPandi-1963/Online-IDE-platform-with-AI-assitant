import passport from 'passport';
import { Router } from 'express';
import { CreateToken } from '../Utils/JWTtoken.js';
import SendCookie from '../Utils/SendCookie.js';
import transporter from '../Utils/Nodemailer.js';
import WelcomePage from '../Utils/Welcome.js';

const GitHubRoutes = Router();
const URL = process.env.FRONTEND_URL_LOCAL;
// Route for GitHub OAuth
GitHubRoutes.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"], // You can request more scopes if needed
  })
);

// Route for GitHub OAuth Callback
GitHubRoutes.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: URL,
  }),
  (req, res) => {
    // Send the user data and message to the frontend
    
    req.session.user = req.user;
    console.log("GitHub User: ", req.user);
    // const OTP = ()=> Math.floor(100000 + Math.random()*899999).toString()
    //     const info = transporter.sendMail({
    //         from: process.env.USER_EMAIL, // sender address
    //         to:email, // list of receivers
    //         subject:" Welcome To Bid - Deal", // Subject line
    //         text: "Thanks for Joining us", // plain text body
    //         html: WelcomePage(username,email,OTP()), // html body
    //       });
    //       console.log(info);
    const token = CreateToken(req.user.id)
    SendCookie(res,token)
    // Redirect to your frontend (React) app
    res.redirect(URL);
  }
);

// Route to get user info (optional)
GitHubRoutes.get("/user", (req, res) => {
  console.log(req.session.user);

  if (req.session && req.session.user) {
    res.json({
      data: req.session.user,
      success: true,
    });
  } else {
    res.json({
      message: "No user found",
      success: false,
    });
  }
});

export default GitHubRoutes;
