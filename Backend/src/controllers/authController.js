const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// Register
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "User exists" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed
        });

        res.json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: err.message });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: err.message });
    }
};
