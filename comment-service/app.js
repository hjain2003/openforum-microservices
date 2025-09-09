import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/dbconn.js";
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();
const app = express();

app.use(cors()); 
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("Comment Service is running...");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Comment service running on port ${PORT}`));
