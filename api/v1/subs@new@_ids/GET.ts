import { Request, Response } from "express";

export default async (req:Request,res:Response) => {
    let t = req.query
    let b = req.params
    res.json({
        Mes:"Dynamic nested route test with swc.",
        Status:"ok",
        Code:200,
        T:t,
        B:b
    })
}