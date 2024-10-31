import express from "express";
import dotenv from  "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from  "path";


import { connectDb } from "./db/connectDb.js";

import authRoutes from  "./routes/auth.route.js";



dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(cors({  origin: "http://localhost:5173", credentials: true }));


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/Frontend/dist")));
    
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "Frontend","dist","index.html"));
    });
}

app.listen(PORT, () => {
    connectDb();
    console.log("Server is running on port: ", PORT );
});
