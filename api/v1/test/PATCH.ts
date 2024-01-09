import { Request, Response } from "express"
import nodemon from "nodemon";

export default function (req:Request,res:Response){

    let data;

    try {
        data = "1234567"
    } catch (error) {
        data = error
    }

    res.json({
        mes:"THIS IS A PATCH REQUEST HANDLER !@",
        data:data
    });
}