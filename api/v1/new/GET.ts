import { Request, Response } from "express"

export default async function (req:Request,res:Response){
    let data, r = req.query.q
    try {
        data = await fetch(`https://freeaiapi.vercel.app/api/Sentiments?query='${r}'`)
    } catch (error) {
        data = error
    }
    let t = await data.json()

    res.json({
        Data:t,
        Query:r
    });
}