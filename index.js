import express from "express";
import "dotenv/config";
import './config/db.js'

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

import { router as albumsRouter } from "./router/albums.js"
import { router as userRouter } from "./router/user.js"


const PORT = process.env.PORT ?? 3000;
app.listen(PORT, (err) => {
    console.log(err? `Error launching server: ${err.message}` 
                   : `Server running on port http://127.0.0.1:${PORT}`
    )
})

app.use("/api/albums", albumsRouter);
app.use("/api/user", userRouter);