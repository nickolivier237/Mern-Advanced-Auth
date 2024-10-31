import bcryptjs from  'bcryptjs';
import crypto from  'crypto';

import { User } from  '../models/user.model.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail } from '../Mailtrap/emails.js';
import { sendWelcomeEmail } from '../Mailtrap/emails.js';
import { sendPasswordResetEmail } from '../Mailtrap/emails.js';
import { sendResetSuccessEmail } from '../Mailtrap/emails.js';

export const signup  = async (req, res) => {
    const {email, password, name} = req.body;

    try {
        if (!email || !password || !name ) {
            throw new Error("All fields are required");
        }
        const userAlreadyExist = await User.findOne({ email });
        if (userAlreadyExist) {
            return res.status(400).json({ success: false , message: "User already exist"});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        })

        await user.save();

        generateTokenAndSetCookie(res,user._id);

        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            sucess: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined
            },
        });

    } catch (error) {
        res.status(400).json({sucess: false, message: error.message});

        
    }
};

export const verifyEmail = async (req, res) => {
    const  { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if(!user) {
            return res.status(400).json({success: false, message: "Invalid or expired verification code"})
        }
            user.isVerified = true;
            user.verificationToken = undefined;
            user.verificationTokenExpiresAt = undefined;
            await user.save();

            await sendWelcomeEmail(user.email, user.name);
            res.status(200).json({
                    success: true,
                    message: "Email verified successfully",
                user : {
                ...user._doc,
                password: undefined,
                }

            })
        } catch (error) {
            console.log("error in verifyEmail", error);
            res.status(500).json({success: false, message: "server error"});
    }
};

export const login  = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({success: false, message: "Invalid email or password"});
        }
        
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        
        if(!isPasswordValid) {
            return res.status(400).json({success: false, message: "Invalid email or password"});
        }
        generateTokenAndSetCookie(res, user._id);

        user.lastlogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });

    } catch (error) {
        console.log("error in login", error);
        res.status(400).json({ success: false, message: error.message});
    }
};

export const logout  = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({sucess: true, message: "Logged Out sucessfully"});
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({success: false, message: "User not Found"});
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() +  1 * 60 * 60 * 1000;
        
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();


        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

            res.status(200).json({success: true, message: "Password reset link sent to your email"});
    } catch (error) {
        console.log("error in forgot password", error);
        res.status(400).json({ success: false, message: error.message});

    }
};

export  const resetPassword = async (req, res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;

        const user  = await User.findOne({resetPasswordToken: token, 
            resetPasswordExpiresAt: { $gt: Date.now()},
    });

        if(!user) {
            return res.status(400).json({success: false, message: "Invalid or expired reset  token"});
        }

        //update password
        const hashedPassword  = await bcryptjs.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        
        await user.save();
        await sendResetSuccessEmail(user.email);

        res.status(200).json({success: true, message: "Password reset successfully"});
    } catch (error) {
        console.log("error in reset password", error);
        res.status(400).json({ success: false, message: error.message});
    }
};

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if(!user){
            return res.status(400).json({success: false, message: "User not found"});
        }

        res.status(200).json ({success: true, user})

    } catch (error) {
        console.log("error in check auth", error);
        res.status(400).json({ success: false, message: error.message});
    }
}