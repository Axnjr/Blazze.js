import { Request, Response } from "express";
import express from "express";
import { readFileSync, watch } from "fs";
import chalk from 'chalk';

export default async function (req:Request,res:Response){
    let t = req.query
    let b = req.params

    console.log(chalk.bgBlackBright.magentaBright("TEST !!"))

    res.json({
        Mes:"Dynamic nested route test with swc.",
        Status:"ok",
        Code:200,
        T:t,
        B:b
    })
}