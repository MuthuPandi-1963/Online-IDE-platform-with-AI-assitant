import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import DB_Config from "./Database/db.config.js";
import authRoutes from "./Router/AuthenticationRoutes.js";
import "./Oauth/Github.js";
import "./Oauth/Google.js";
import passport from "passport";
import GoogleRoutes from "./Router/GoogleRoutes.js";
import GitHubRoutes from "./Router/GitHubRoutes.js";
import session from "express-session";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    session({
        name: "token",
        secret: process.env.SESSION_SECRET || "your_secret_key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production", // Secure cookies in production
            sameSite:  "None",
        },
    })
);
app.use(
    cors({
        origin: process.env.FRONTEND_URL_LOCAL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Authorization", "Content-Type"],
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/auth", GoogleRoutes);
app.use("/auth", GitHubRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Online Auction Page",
    });
});

// Start Server
app.listen(PORT, async () => {
    await DB_Config();
    console.log(`Server is running on http://localhost:${PORT}`);
});
