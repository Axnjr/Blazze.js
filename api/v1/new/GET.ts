import { Request, Response } from "express";

export default function (req:Request,res:Response){
    res.json("You made a GET request, this is route new !!");
}