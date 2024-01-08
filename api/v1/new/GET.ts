import { Request, Response } from "express";

// export const cache = { RevalidatedIn: "500" }

export default async function (req:Request,res:Response){

    let data;
    
    try {
        data = await fetch("https://freeaiapi.vercel.app/api/Sentiments?query='hi, how are you ?'")
    } catch (error) {
        data = error
    }

    let t = await data.json()

    res.json({
        Data:JSON.stringify(t)
    });
}