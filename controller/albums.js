import { Album } from "../model/mongoDB/album.js";

export const albumController = {
    async getAll(req, res){
        const albumCollection = await Album.find();
        albumCollection
            ? res
                .status(200)
                .json({success: true, message: "List of albums", data: albumCollection})
            : res
                .status(404)
                .json({success: false, message: "No albums"})
    },
    async getByNombre(req, res) {
        const { nombre } = req.query;
        if(!nombre) 
            res.status(400).json({sucess: true, message: "Missing nombre query param"});
        try{
        const albums = await Album.find({ nombre: { $regex: nombre, $options: "i" }});
        if(!albums.length) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: `No albums with ${nombre} in the nombre`,
                })};
                res
                .status(200)
                .json({
                    success: true,
                    message: `Albums by query ${nombre}`,
                    data: albums,
                });
    } catch (err) {
        res.status(500).json({ success: false, message: `Internal error: ${err.message}`})
    }
},

    async createOne(req, res){
        const  { nombre, artista, genero, duracion, cantidad_canciones, año } = req.body;
        try { const newAlbum = new Album({ nombre, artista, genero, duracion, cantidad_canciones, año });
            const savedAlbum = await newAlbum.save();
            res.
                status(200)
                .json({success: true, message: "Album created", data: savedAlbum });  
        } catch (err){
            res
            .status(400)
            .json({success: false, message: err.message});
        }
    },

    async updateAlbum(req, res){
        const allowedFields = ["nombre", "artista", "genero", "duracion", "cantidad_canciones", "año"]
        try {
            const updates = Object.keys(req.body)
            const isValidOperation = updates.every((update) => 
                allowedFields.includes(update))
            if(!isValidOperation){
                return res.status(400).json({
                    success: false,
                    message: "Invalid field in the request body. Operation aborted."
                });
            }
            const album = await Album.findByIdAndUpdate(req.params.id, req.body, {new: true})
            if(!album){
                return res.status(404).json({
                    success: false,
                    message: `Album not found`,
                });
            }
            res.status(200).json(
                {success: true, message: "Album updated", data: album}
            )
        } catch (error) {
            res.status(500).json({
                success: false, message: `Internal Server Error ${error.message}`
            });
        };
    },

    async deleteOne(req, res){
        try {
            const album = await Album.findByIdAndDelete(req.params.id);
            if(!album){
                return res.status(404).json({
                    success: false,
                    message: `Album not found`
                });
            }
            res.send(204);
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        };
    },

    async getById(req, res) {
        const { id } = req.params;
        if(!id) 
            res.status(400).json({sucess: true, message: "Missing id query param"});
        try{
        const albums = await Album.findById(id);
        if(!albums) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: `No albums with the id: ${id} in the id`,
                })};
                res
                .status(200)
                .json({
                    success: true,
                    message: `Albums by id: ${id}`,
                    data: albums,
                });
    } catch (err) {
        res.status(500).json({ success: false, message: `Internal error: ${err.message}`})
    }
},

}; 

