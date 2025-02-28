import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Generate an access token (Valid for 7 days)
const CreateToken = (id, role = "user") => {
    return jwt.sign(
        { id, role},
        process.env.JWT_KEY,
        { expiresIn: "30d" }
    );
};

// Verify token with proper error handling
const VerifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return { expired: true, message: "Token has expired" };
        }
        if (err.name === "JsonWebTokenError") {
            return { invalid: true, message: "Invalid token" };
        }
        return { error: true, message: "Token verification failed" };
    }
};

// Generate a refresh token (Valid for 30 days)
const CreateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_KEY, { expiresIn: "30d" });
};

// Set JWT token as HTTP-only cookie


export { CreateToken, VerifyToken, CreateRefreshToken };
