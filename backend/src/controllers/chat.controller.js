import { generateStreamToken } from '../lib/stream.js'; // Assuming you have a function to generate the token

export async function getStreamToken(req, res) {
    try {
        const userId = req.user.id;
        const token = await generateStreamToken(userId); // Assuming you have a function to generate the token
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error in getStreamToken controller ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}