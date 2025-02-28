


const SendCookie = (res, token) => {
    console.log("Sending token:", token);

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        // path: "/",
    });
    
    return token;
};

export default SendCookie;