#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, appendFileSync } from "fs";
import swc from "@swc/core"
import { chconf, whiteMessage} from "./chconf.js"
import chalk from "chalk";

const config = await chconf() ?? {
    rootEndPoint: "api/v1",
    TS: true,
    port: 3000,
    staticRoot: "public"
};

const starterCode = `import express from "express";const x=express();x.use(express.static(\`${config.staticRoot ?? "public"}\`));x.listen(\`${config.port}\`,()=>{console.log("App running on port: \`${config.port}\`")})`;

class BlazeBuild {

    cache;

    constructor() {
        this.cache = JSON.parse(readFileSync("blaze.cache.json", "utf-8"));
        if (!existsSync("/blaze.build.js")) {
            writeFileSync(`${process.cwd()}/blaze.build.js`, starterCode, "utf-8");
        }
        this._runBuild();
    }

    generateFuncName() {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        let randomName = '';
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * alphabet.length);
            randomName += alphabet[randomIndex];
        }
        return randomName;
    }


    _runBuild() {

        for (const [method, routes] of Object.entries(this.cache)) {

            routes.forEach(route => {

                let 
                    path = `${config.rootEndPoint}/${route}`,
                    funcName = this.generateFuncName(),
                    temp = readFileSync(`${process.cwd()}/${path}/${method}.js`, "utf-8")
                            .replace("export default function",`function ${funcName}`),
                    routeCode
                ;

                temp = swc.minifySync(temp).code //compress.minify(temp).code

                if (route.includes("@")) {
                    route = route.replaceAll("@", "/");
                } 
                // for nested routes
                if (route.includes("_")) {
                    route = route.replaceAll("_", ":");
                } 
                // for dynamic routes
                const boilerPlate = `async(a,s)=>{try{ let v = await ${funcName}(a,s)}catch(e){ console.error("[Blazze error in build:]",e);s.status(500).send(JSON.stringify({e})) }}`;
                if(method == "GET"){ routeCode = `x.get("/${config.rootEndPoint}/${route}", ${boilerPlate});` }
                if(method == "POST"){ routeCode = `x.post("/${config.rootEndPoint}/${route}", ${boilerPlate});` }
                if(method == "PUT"){ routeCode = `x.put("/${config.rootEndPoint}/${route}", ${boilerPlate});` }
                if(method == "DELETE"){ routeCode = `x.delete("/${config.rootEndPoint}/${route}", ${boilerPlate});` }
                if(method == "PATCH"){ routeCode = `x.patch("/${config.rootEndPoint}/${route}", ${boilerPlate});` }
                appendFileSync(`${process.cwd()}/blaze.build.js`, ";\n"+routeCode+";\n"+temp)
            });
        }

        console.log(chalk.bold.rgb(98, 0, 255)("Your optimized Blazze build was created successfully 🎉🚀"))
    }

}

new BlazeBuild();