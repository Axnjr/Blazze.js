#!/usr/bin/env node
import chalk from "chalk";
import { createRequire } from "module";
import { chconf, errorRed, whiteMessage, infoCyan } from "./chconf.js"
import nodemon from "nodemon";
import swc from "@swc/core"
import { writeFileSync } from "fs";

const packageVersion = "1.2.1"
const require = createRequire(import.meta.url);
const scriptToRun =
    process.env.devEnviroment == "true"
        ?
    "dev.js"
        :
    require.resolve("blazze").replace("index.js", "") + "/dev.js"
;
const config = await chconf()

async function transpileTs(routeToTsFile) {

    let 
        t = routeToTsFile[0].replaceAll("\\","/").split(config.rootEndPoint),
        start = performance.now(),
        jsFromTs
    ;

    whiteMessage("○ Blaze Transpiling TypeScript /", routeToTsFile)

    try {
        jsFromTs = await swc.transformFile(config.rootEndPoint + t[1])
        writeFileSync(config.rootEndPoint+t[1].replace("ts","js"), jsFromTs.code)

        let end = performance.now()
        whiteMessage(`✓ Ready in ${(end - start).toFixed(2)}ms`)

    } 

    catch (error) {
        errorRed("[Blazze TS transpilation error, waiting for file changes !]",error)
    }

    return
}

nodemon({
    script: scriptToRun,
    ext: config.TS ? "ts" : "js",  // File extensions to watch for changes
    watch: [config.rootEndPoint],  // Watch only the specified file for changes
})

.on('restart', async (file) => {
    infoCyan("Restarting blazze ...")
    transpileTs(file)
});

console.log(
    chalk.rgb(247,15,234)(`▩ Blazze.js ${packageVersion}`),
    chalk.whiteBright("|"),
    chalk.greenBright.bold(`✓`),
    chalk.whiteBright(`Started Root Endpoint: http://localhost:${config.port}/${config.rootEndPoint}`
))