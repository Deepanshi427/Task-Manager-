const dotenv = require("dotenv");
const app = require("./src/app");
const connectDB = require("./src/config/db");

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = () => {
    app.listen(PORT, async () => {
        console.log(`Server running on ${PORT}`);

        try {
            await connectDB();
        } catch (err) {
            console.error("MongoDB connection failed during startup:", err.message);
            console.error("The API is running, but database-backed routes will fail until MongoDB is reachable.");
        }
    });
};

startServer();
