import express from "express";
const app = express();
import "dotenv/config";
import connectDb from "./config/connectDb.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"

const port = process.env.port;
connectDb(process.env.MONGO_URL);

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

app.listen(port, () => {
    console.log("Server running in port",port)
})
