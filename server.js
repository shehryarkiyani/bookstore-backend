import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { testConnection } from "./config/db.js";

dotenv.config()

const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))


const PORT = process.env.PORT || 3000
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await testConnection();
})