import express from "express";
import { router as albumsRouter } from "./router/albums.js"
const app = express();
app.use(express.urlencoded())
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, (err) => {
    console.log(err? `Error launching server: ${err.message}` :
        `Server running on port http://127.0.0.1:${PORT}`
    )
})

app.use("/api/albums", albumsRouter);