import { Request, Response } from "express";
import chalk from 'chalk';

export default async function (req:Request,res:Response,blazze:any){

    let t = req.query
    let b = req.params

    console.log(chalk.bgBlackBright.magentaBright("TEST !!"))

    const body = {
        Mes:"Dynamic nested route test with swc.",
        Status:"ok",
        Code:200,
        Query:t,
        Params:b
    }

    blazze("json",body,"subs@new@_ids/GET")

    res.json(body)

}