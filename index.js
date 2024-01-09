#!/usr/bin/env node
import chalk from "chalk";
import { chconf, errorRed, infoGreyDev, whiteMessage } from "./src/chconf.js"
import nodemon from "nodemon";
import swc from "@swc/core"
import { existsSync, writeFileSync, mkdirSync, readdirSync, unlinkSync } from "fs";
import { revalidateCache } from "./src/cache.js";

const config = await chconf()

if(config.TS){
    let temp = config.resolvePath+`ts/${config.rootEndPoint}`
    // console.log(config.resolvePath+`ts/${config.rootEndPoint}`)
    if(!existsSync(temp)){
        mkdirSync(temp, { recursive: true })
    } 

    // transpile all ts files ar server start 
    readdirSync(config.rootEndPoint).forEach(dir => {
        readdirSync(config.rootEndPoint+"/"+dir).forEach(file => {
            let rtf = "/"+dir+"/"+file
            if(rtf.length > 3) 
                transpileTs(rtf, false)
        })
    })
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
    ext: "js,ts", // config.TS ? "ts" : "js",  // File extensions to watch for changes
    watch: [config.rootEndPoint,"cache"],  // Watch only the specified file for changes
})

.on('restart', async (file) => {
    // nodemon restarts the server whenever:
    //  @ There is change in the files in the rootEndPoint dir
    //  @ There is change in the files in the cache dir
    // -------------------------------------------------------------------------------------- //
    let t = file[0].replaceAll("\\","/").split(config.rootEndPoint)
    // if changed file was in the cache then "t" would have length 1, as there will be no split
    // we get a array of two 1st val is c/user../rootEndPonit and 2nd val is the dir/file that was changed
    if(config.TS && t.length > 1){
        try {
            let file = `cache/${t[1].toLowerCase().replaceAll("/",".").replaceAll("ts","js")}`
            if(existsSync(file))
                unlinkSync(file)
        } 
        catch (error) {infoGreyDev("At index nodemon restart: ",error)}
        transpileTs(t[1], true)
    }

    if(t.length < 2){
        errorRed("cachw was changed !!")
    }
});

console.log(chalk.gray(`
${chalk.bold.rgb(98, 0, 255)(`✦  Blazze.js v.${packageVersion} `)}
    ${greenArrow()} Local: ${chalk.cyanBright(`http://localhost:${config.port}/${config.rootEndPoint}`)}
    ${greenArrow()} Config: blaze.config.js
    ${greenArrow()} Request Caching: ${config.cacheRequests ? "enabled" : "disabled"}
    ${greenArrow()} Running in ${chalk.cyanBright(config.TS ? "TypeScript" : "JavaScript")}
`));

revalidateCache("Revalidating at server start")

function greenArrow(){
    return chalk.greenBright("➜ ")
}

async function transpileTs(routeToTsFile,logMesBool) {
    let 
        start = performance.now(),
        jsFromTs
    ;

    if(logMesBool) whiteMessage(chalk.cyanBright("o"),"Blaze Transpiling TypeScript /", routeToTsFile)

    try {

        jsFromTs = await swc.transformFile(config.rootEndPoint + routeToTsFile,{
            swcrc:true,
            filename:routeToTsFile
        })

        writeFileSync(`blazze/${routeToTsFile.replaceAll("/",".").replace("ts","js")}`, jsFromTs.code)

        let end = performance.now()
        if(logMesBool) whiteMessage(chalk.greenBright("✓"),`Ready in ${chalk.greenBright((end - start).toFixed(2))} ms`)
    } 

    catch (error) {
        errorRed("[Blazze TS transpilation error, waiting for file changes !]",error)
    }

    return
}