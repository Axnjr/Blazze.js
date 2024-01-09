import { Request, Response } from "express"
import nodemon from "nodemon";

export default function (req:Request,res:Response){
    res.json("THIS IS A DELETE REQUEST HANDLER !!");
}