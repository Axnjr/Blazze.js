#!/usr/bin/env node
import chalk from "chalk";
// import { createRequire } from "module";
import { chconf, errorRed, whiteMessage } from "./src/chconf.js"
import nodemon from "nodemon";
import swc from "@swc/core"
import { writeFileSync } from "fs";
import { revalidateCache } from "./src/cache.js";

const packageVersion = "1.24.1"

// const require = createRequire(import.meta.url);

const scriptToRun =
    process.env.devEnviroment == "true"
        ?
    "src/dev.js"
        :
    config.resolvePath+"/src/dev.js"
;

const config = await chconf()

async function transpileTs(routeToTsFile) {
    let 
        t = routeToTsFile[0].replaceAll("\\","/").split(config.rootEndPoint),
        start = performance.now(),
        jsFromTs
    ;

    whiteMessage(chalk.cyanBright("o"),"Blaze Transpiling TypeScript /", routeToTsFile)

    try {

        jsFromTs = await swc.transformFile(config.rootEndPoint + t[1],{
            swcrc:true
        })

        writeFileSync(`${config.resolvePath}/ts/${config.rootEndPoint}/${t[1].replaceAll("/",".").replace("ts","js")}`, jsFromTs.code)
        // writeFileSync(config.rootEndPoint+t[1].replace("ts","js"), jsFromTs.code)

        let end = performance.now()
        whiteMessage(chalk.greenBright("✓"),`Ready in ${chalk.greenBright((end - start).toFixed(2))} ms`)
    } 

    catch (error) {
        errorRed("[Blazze TS transpilation error, waiting for file changes !]",error)
    }

    return
}

await nodemon({
    script: scriptToRun,
    ext: config.TS ? "ts" : "js",  // File extensions to watch for changes
    watch: [config.rootEndPoint],  // Watch only the specified file for changes
})

.on('restart', async (file) => {
    if(config.TS)
        transpileTs(file)
});

function greenArrow(){
    return chalk.greenBright("➜ ")
}

console.log(chalk.gray(`
${chalk.bold.rgb(98, 0, 255)(`✦  Blazze.js v.${packageVersion} `)}
    ${greenArrow()} Local: ${chalk.cyanBright(`http://localhost:${config.port}/${config.rootEndPoint}`)}
    ${greenArrow()} Config: blaze.config.js
    ${greenArrow()} Running in ${chalk.cyanBright(config.TS ? "TypeScript" : "JavaScript")}
`))

revalidateCache("Revalidating at server start")