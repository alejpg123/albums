import { Router } from "express"
import { albumController } from "../controller/albums.js";
export const router = Router();
import { token } from "../services/jwt.js"
router.get("/", albumController.getAll)
router.get("/s", albumController.getByNombre)
router.get("/:id", albumController.getById)
router.post("/", token.validated, albumController.createOne)
router.patch("/:id", token.validated, albumController.updateAlbum)
router.delete("/:id", token.validated, albumController.deleteOne)