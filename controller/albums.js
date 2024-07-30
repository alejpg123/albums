import albums from "../model/fileSystem/data.json" assert { type: "json"};
export const albumController = {
    getAll(req, res){
        albums.length
            ? res
                .status(200)
                .json({success: true, message: "List of albums", data: albums}) 
            : res
                .status(404)
                .json({success: false, message: "No albums"})
    },
    getByTitle(req, res) {
        const { title } = req.query
        if(!title) res.status(400).json({sucess: true, message: "Missing title query param"})
        res.send(`${title}`)
    }
}; 

