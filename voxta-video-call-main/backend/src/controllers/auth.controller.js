import { upsertStreamUser } from '../lib/stream.js';
import User from '../models/User.js'; // Adjust path if needed
import jwt from 'jsonwebtoken';

export async function signup(req, res) {
    const { email, fullName, password } = req.body;

    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });

        }
        const idx=Math.floor(Math.random()*100)+1;
        const randomAvatar=`https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser = await User.create({
            fullName,
            email,
            password,
            profilePic: randomAvatar, // Assigning a random avatar
        });

        try {
            await upsertStreamUser({
            id:newUser._id.toString(),
            name: newUser.fullName,
            image: newUser.profilePic || "",
        });
        console.log(`Stream user created for ${newUser.fullName}`);
        } catch (error) {
            console.error("Error creating Stream user:", error);
        }

        const token=jwt.sign({userId: newUser._id},process.env.JWT_SECRET_KEY, {expiresIn: "7d"});
        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

export async function login(req, res) {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user=await User.findOne({ email });
        if(!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await user.matchPassword(password);
        if(!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token=jwt.sign({userId: user._id},process.env.JWT_SECRET_KEY, {expiresIn: "7d"});
        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.status(200).json({success: true, user});
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).json({ message: "Server error" });
    }
}

export function logout(req, res) {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "Logged out successfully" });
}

export async function onboard(req, res) {
    try {
        const userId=req.user._id;
        const {fullName,bio, nativeLanguage, learningLanguage, location} = req.body;
        if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({ message: "All fields are required",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location"
                ].filter(Boolean),
             });
        }
        const updatedUser = await User.findByIdAndUpdate(userId, {
            ...req.body,
            isOnboarded: true
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        try {
            await upsertStreamUser({
            id: updatedUser._id.toString(),
            name: updatedUser.fullName,
            image: updatedUser.profilePic || "",
        });
        console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
        }catch (streamError) {
            console.error("Error updating Stream user during onboarding:", streamError.message);
        }

        res.status(200).json({success: true, user: updatedUser});
    } catch (err) {
        console.error("Error during onboarding:", err.message);
        res.status(500).json({ message: "Server error" });
    }
}