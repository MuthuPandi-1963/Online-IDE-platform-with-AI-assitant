import userModels from '../../Models/userModels.js';
import bcryptjs from 'bcryptjs';
import { CreateToken } from '../../Utils/JWTtoken.js';
import SendCookie from '../../Utils/SendCookie.js';
import transporter from '../../Utils/Nodemailer.js';
import WelcomePage from '../../Utils/Welcome.js';

const RegisterPage = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if all required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields (username, email, password) are required",
            });
        }

        // Check if the user already exists
        const existingUser = await userModels.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create a new user
        const newUser = new userModels({
            username,
            email,
            password: hashedPassword,
            role: role || "user",
        });
        await newUser.save(); // Ensures data is saved properly
        const OTP = ()=> Math.floor(100000 + Math.random()*899999).toString()
        const info = await transporter.sendMail({
            from: process.env.USER_EMAIL, // sender address
            to:email, // list of receivers
            subject:" Welcome To Bid - Deal", // Subject line
            text: "Thanks for Joining us", // plain text body
            html: WelcomePage(username,email,OTP()), // html body
          });
          console.log(info);
          
        // Generate token using user ID
        const token = await CreateToken(newUser._id);

        // Send token via cookie
        await SendCookie(res, token);

        // Respond with success
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};

export default RegisterPage;
