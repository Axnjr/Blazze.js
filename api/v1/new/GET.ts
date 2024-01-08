import { Request, Response } from "express";

// export const cache = { RevalidatedIn: "500" }

export default function (req:Request,res:Response){
    res.json("You made a GET request, this is route new !!");
}