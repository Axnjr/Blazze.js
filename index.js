#!/usr/bin/env node
import chalk from "chalk";
import { chconf, errorRed, whiteMessage } from "./src/chconf.js"
import nodemon from "nodemon";
import swc from "@swc/core"
import { existsSync, writeFileSync, mkdirSync, appendFileSync } from "fs";
import { revalidateCache } from "./src/cache.js";

const config = await chconf()

if(config.TS){
    let temp = config.resolvePath+`ts/${config.rootEndPoint}`
    // console.log(config.resolvePath+`ts/${config.rootEndPoint}`)
    if(!existsSync(temp)){
        mkdirSync(temp, { recursive: true })
    } 
}

const packageVersion = "1.0.3"
const scriptToRun =
    process.env.devEnviroment == "true"
        ?
    "src/dev.js"
        :
    config.resolvePath+"/src/dev.js"
;

await nodemon({
    script: scriptToRun,
    ext: config.TS ? "ts" : "js",  // File extensions to watch for changes
    watch: [config.rootEndPoint],  // Watch only the specified file for changes
})

.on('restart', async (file) => {

    let t = routeToTsFile[0].replaceAll("\\","/").split(config.rootEndPoint)

    let temp = t[1].replaceAll("/","")

    appendFileSync(config.resolvePath+"src/cache.Hint.json", `
        ${temp}: false 
    `) // false means don't cache 

    if(config.TS)
        transpileTs(t)
});

console.log(chalk.gray(`
${chalk.bold.rgb(98, 0, 255)(`✦  Blazze.js v.${packageVersion} `)}
${greenArrow()} Local: ${chalk.cyanBright(`http://localhost:${config.port}/${config.rootEndPoint}`)}
${greenArrow()} Config: blaze.config.js
${greenArrow()} Running in ${chalk.cyanBright(config.TS ? "TypeScript" : "JavaScript")}
`))

revalidateCache("Revalidating at server start")

function greenArrow(){
    return chalk.greenBright("➜ ")
}

async function transpileTs(routeToTsFile) {
    let 
        // t = routeToTsFile[0].replaceAll("\\","/").split(config.rootEndPoint),
        start = performance.now(),
        jsFromTs
    ;

    whiteMessage(chalk.cyanBright("o"),"Blaze Transpiling TypeScript /", routeToTsFile)

    try {

        jsFromTs = await swc.transformFile(config.rootEndPoint + routeToTsFile[1],{
            swcrc:true
        })

        writeFileSync(`blazze/${routeToTsFile[1].replaceAll("/",".").replace("ts","js")}`, jsFromTs.code)
        // writeFileSync(config.rootEndPoint+t[1].replace("ts","js"), jsFromTs.code)

        let end = performance.now()
        whiteMessage(chalk.greenBright("✓"),`Ready in ${chalk.greenBright((end - start).toFixed(2))} ms`)
    } 

    catch (error) {
        errorRed("[Blazze TS transpilation error, waiting for file changes !]",error)
    }

    return
}