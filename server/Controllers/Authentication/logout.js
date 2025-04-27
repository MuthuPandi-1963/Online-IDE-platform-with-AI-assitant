import userModels from '../../Models/userModels.js';

const LogoutPage = async (req, res) => {
    try {
        // Get user from authentication middleware
        const user = req.user;
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated"
            });
        }

        // Find user and update login status
        const currentUser = await userModels.findById(user._id);
        
        if (!currentUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Update login status
        currentUser.isLoggedIn = false;
        await currentUser.save();

        // Clear the HTTP-only cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (err) {
        console.error('Logout error:', err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

export default LogoutPage;