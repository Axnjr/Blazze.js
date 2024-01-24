#!/usr/bin/env node
import {
	readFileSync, writeFileSync, existsSync, appendFileSync,
} from 'fs';
import chalk from 'chalk';
import { chconf, errorRed } from './chconf.js';

const config = await chconf();

let starterCode = '';

if (config.cacheRequests) {
	starterCode += `import { existsSync, mkdirSync, writeFileSync } from "fs";import express from "express";const x=express();x.use(express.static(\`${config.staticRoot ?? 'public'}\`));x.listen(\`${config.port}\`,()=>{console.log("App running on port: \`${config.port}\`")})
;express.response.logResponse=function(e,c,s,a,n){existsSync("cache")||mkdirSync("cache",{recursive:!0}),writeFileSync("cache/"+"."+a+"."+n+".js", \`export const cache = \${JSON.stringify({Key:{query:e,params:c},Value:s},null,4)\}\`)};
async function _checkRequestCache(a,b,c,d){let e;if(existsSync("cache/."+c+"."+d+".js"))try{e=await import("file:///"+process.cwd()+"/cache/."+c+"."+d+".js");const{Key:f,Value:g}=e.cache;if(JSON.stringify(f.query) == JSON.stringify(a.query)){console.log("Cache HIT ✓");b.send(g);return true;};}catch (e) {};}
async function _cacheMiddleware(req,res,next,originalRoute,method){let originalResSend = res.send;res.send = function(body){originalResSend.apply(res, arguments);res.logResponse(req.query,req.params,body,originalRoute,method)};next();return;};`;
} else {
	starterCode += `import express from "express";const x=express();x.use(express.static(\`${config.staticRoot ?? 'public'}\`));x.listen(\`${config.port}\`,()=>{console.log("App running on port: \`${config.port}\`")})`;
}

class BlazeBuild {
	constructor() {
		this.cache = JSON.parse(readFileSync('blaze.cache.json', 'utf-8'));
		this.lang = config.TS ? 'ts' : 'js';
		this.imports = '';
		if (!existsSync('/blaze.build.js')) {
			writeFileSync(`${process.cwd()}/blaze.build.js`, starterCode, 'utf-8');
		}
		this._runBuild();
	}

	generateFuncName() {
		const alphabet = 'abcdefghijkmopqrstuwxyz';
		let randomName = '';
		for (let i = 0; i < 3; i++) {
			const randomIndex = Math.floor(Math.random() * alphabet.length);
			randomName += alphabet[randomIndex];
		}
		return randomName;
	}

	getEditedFileContent(pathToFile, funcName) {
		let tempFileContent = readFileSync(pathToFile, 'utf-8')
			.replace('export default function', `function ${funcName}`)
			.replace(/asyncGeneratorStep/g, this.generateFuncName())
			.replace(/_async_to_generator/g, this.generateFuncName())
			.replace(/_ts_generator/g, this.generateFuncName())
			.replace(/_ref/g, this.generateFuncName());
		const importStatements = tempFileContent.match(/^import .*?;\n*/gm);

		if (importStatements) {
			this.imports += `${importStatements[0]};`;
			tempFileContent = tempFileContent.replace(importStatements, '');
		}

		return tempFileContent;
	}

	_runBuild() {
		for (const [method, routes] of Object.entries(this.cache)) {
			routes.forEach((route) => {
				let routeCode = '';

				if (config.cacheRequests) {
					routeCode += `x.use("/", async (a,s,n) => {_cacheMiddleware(a,s,n,"${route}","${method}");});`;
				}

				const funcName = this.generateFuncName();
				const pathToFile = this.lang == 'ts'
					? `blazze/.${`${route}.${method}`}.js`
					: `${process.cwd()}/${config.rootEndPoint}/${route}/${method}.js`;

				const temp = this.getEditedFileContent(pathToFile, funcName);

				let boilerPlate = `async(a,s)=>{
                    try{ 
                        ${config.cacheRequests ? `if(await _checkRequestCache(a,s,"${route}","${method.toLocaleLowerCase()}")){
                            console.log("REQUEST WAS CACHED IN BUILD !!");
                            return; 
                        };` : ''}
                        let v = await ${funcName}(a,s)
                    }
                    catch(e){ console.error("[Blazze error in build:]",e);s.status(500).send(JSON.stringify({e})) }
                }`;

				// @ for nested routes, _ for dynamic routes
				route = route.replaceAll('@', '/').replaceAll('_', ':');
				// route = route.replaceAll("_", ":");

				if (config.cacheRequests) {
					boilerPlate += '';
				}

				if (method == 'GET') { routeCode += `x.get("/${config.rootEndPoint}/${route}", ${boilerPlate});`; }
				if (method == 'POST') { routeCode += `x.post("/${config.rootEndPoint}/${route}", ${boilerPlate});`; }
				if (method == 'PUT') { routeCode += `x.put("/${config.rootEndPoint}/${route}", ${boilerPlate});`; }
				if (method == 'DELETE') { routeCode += `x.delete("/${config.rootEndPoint}/${route}", ${boilerPlate});`; }
				if (method == 'PATCH') { routeCode += `x.patch("/${config.rootEndPoint}/${route}", ${boilerPlate});`; }

				try {
					appendFileSync(`${process.cwd()}/blaze.build.js`, `;\n${routeCode};\n${temp}`);
				} catch (error) {
					errorRed('[Blazze Error while building:]', error);
				}
			});
		}

		this.imports = Array.from(new Set(this.imports.split(';'))).toString();

		try {
			const finalFileRead = readFileSync(`${process.cwd()}/blaze.build.js`, 'utf-8');
			writeFileSync(`${process.cwd()}/blaze.build.js`, this.imports + finalFileRead);
		} catch (error) {
			errorRed('[Blazze Error while building:]', error);
		}

		console.log(chalk.bold.rgb(98, 0, 255)('Your optimized Blazze build was created successfully 🎉🚀'));
	}
}

new BlazeBuild();
