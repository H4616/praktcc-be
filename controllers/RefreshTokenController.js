import Auth from "../models/AuthModel.js";
import jwt from "jsonwebtoken";

export const refreshtoken = async(req, res)=>{
    console.log(req.cookies)
    try{
        const refreshtoken = req.cookies.refreshtoken;
        if(!refreshtoken) return res.sendStatus(401).json({ msg: "No refresh token found" });;
        const auth = await Auth.findOne({
            where:{
                refresh_token: refreshtoken
            }
        });

        if(!auth) return res.sendStatus(403);
        jwt.verify(refreshtoken, process.env.REFRESH_TOKEN, (err, decoded)=>{
            if(err) return res.sendStatus(403);
            const userId = auth.id;
            const userName = auth.username;
            const userEmail = auth.email;
            const accesstoken = jwt.sign({userId, userName, userEmail}, process.env.ACCESS_TOKEN, {expiresIn: '60s'});
            res.json({accesstoken});
        })
    }catch (error) {
        console.log({error});
    }
}