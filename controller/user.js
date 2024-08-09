import { User } from "../model/mongoDB/user.js";
import bcrypt from "bcrypt"
import { token } from "../services/jwt.js"
const saltRounds = 10;

export const userController = {

    async registerUser(req, res){
        const { fullName, email } = req.body;
        const password = await bcrypt.hash(req.body.password, saltRounds)
        const data = { fullName, email, password };
        const newUser = new User(data);
        try {
            const savedUser = await newUser.save();
            res.status(201).json({ success: true, messsage: "New user registered", data: savedUser })
            } catch (err) {
                res.status(500).json({ success: false, message: `Internal error: ${err.message}` })
            }
        },
        
    async loginUser(req, res) {
        const user = await User.find().where({ email: req.body.email });
        if(!user.length) {
            return res.status(401).json({ success: false, message: "Name or password invalid" })
        } 
        const hashedPassword = user[0].password;
        const match = await bcrypt.compare(req.body.password, hashedPassword);
        if (!match) {
            return res.status(401).json({ success: false, message: "Name or password invalid" });
        }
        const accessToken = await token.generate(user[0]);
        res.status(200).json({ success: true, message: "User logged in", data: accessToken });
    },
};
