import { Router } from "express"
import { albumController } from "../controller/albums.js";
export const router = Router();
router.get("/", albumController.getAll)
router.get("/s", albumController.getByTitle)
router.get("/:id", (req, res) => {
    const {id} = req.params
    res.send(`List an album by id: ${id}`)
})
router.post("/", (req, res) => res.send("Create an album"))
router.patch("/:id", (req, res) => {
    const {id} = req.params
    res.send(`Update an album by id: ${id}`)
})
router.delete("/:id", (req, res) => {
    const {id} = req.params
    res.send(`Delete an album by id: ${id}`)
})