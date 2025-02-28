import passport from 'passport'
import passportGithub from 'passport-github2'
import userModels from '../Models/userModels.js'
import dotenv from 'dotenv'
dotenv.config()

const URL = process.env.BACKEND_URL_LOCAL


passport.use(new passportGithub.Strategy({
    clientID: process.env.GITHUB_CLIENT_KEY,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${URL}/auth/github/callback`
},
async(accessToken,refreshToken,profile,done)=>{
    const existingUser = await userModels.findOne({authId:profile.id})
    if(existingUser){
        existingUser.isLoggedIn = true;
        await existingUser.save();
        return done(null, existingUser);
    }else {
        // If user doesn't exist, create a new user
        const newUser = new userModels({
          authType: 'Github',
          authId: profile.id,
          email: profile.email || `githubUser${profile.id}@gmail.com`,  // Use Google email
          username: profile.username,  // Use Google profile name
          isLoggedIn: true,
          isVerified :true
        });

        await newUser.save();
        return done(null, newUser);
      }
}))

  // Serialize user into session
  passport.serializeUser((user, done) => done(null, user));
  
  // Deserialize user from session
  passport.deserializeUser((user, done) => done(null, user));