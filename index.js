#!/usr/bin/env node
import chalk from 'chalk';
import nodemon from 'nodemon';
import swc from '@swc/core';
import { existsSync, writeFileSync, mkdirSync, readdirSync, unlinkSync } from 'fs';
import { chconf, errorRed, infoGreyDev, whiteMessage } from './src/chconf.js';
import { revalidateCache } from './src/cache.js';

const config = await chconf();

function greenArrow() {
	return chalk.greenBright('➜ ');
}

async function transpileTs(routeToTsFile, logMesBool) {
	let start = performance.now(), jsFromTs;

	if (routeToTsFile.includes('cache')) { return; }
	if (logMesBool) whiteMessage(chalk.cyanBright('o'), 'Blaze Transpiling TypeScript /', routeToTsFile);

	try {
		jsFromTs = await swc.transformFile(config.rootEndPoint+"/"+routeToTsFile, {
			swcrc: true,
			filename: routeToTsFile,
		});

		if (!existsSync('blazze')) { mkdirSync('blazze') }

		writeFileSync(`blazze/${routeToTsFile.replaceAll('/', '').toLowerCase().replace('ts', 'js')}`, jsFromTs.code);

		const end = performance.now();
		if (logMesBool) whiteMessage(chalk.greenBright('✓'), `Ready in ${chalk.greenBright((end - start).toFixed(2))} ms`);
	} 
	
	catch (error) {
		errorRed('[Blazze TS transpilation error, waiting for file changes !]', error);
	}
}

// on script start transiple all ts files once
if (config.TS) {
	if (!existsSync("blazze")) {
		mkdirSync("blazze", { recursive: true });
	}
	
	// transpile all ts files ar server start
	readdirSync(config.rootEndPoint).forEach((dir) => {
		readdirSync(`${config.rootEndPoint}/${dir}`).forEach((file) => {
			const rtf = `${dir}/${file}`;
			if (rtf.length > 3) { transpileTs(rtf, false); }
		});
	});
}

const packageVersion = '1.4.1';

const scriptToRun = process.env.devEnviroment == 'true'
	? 'src/dev.js'
	: `${config.resolvePath}/src/dev.js`
;

// console.log("SCRIPT:",scriptToRun);

await nodemon({
	script: scriptToRun,
	ext: config.TS ? 'ts,js' : 'js', // File extensions to watch for changes
	watch: [config.rootEndPoint],
	verbose: true,
})

	.on('restart', async (changedFiles) => {
		// nodemon gives a array of paths of the files that were changed on restart
		// however we are just intrested in the first value of the array 
		let fileName = changedFiles[0].replaceAll('\\', '/').split(config.rootEndPoint);

		infoGreyDev("Changed file on restart:",fileName,changedFiles)
		// whenever there is a new request we revalidate the cache 
		// but we dont want to do anything on this event !
		if (changedFiles.includes('cache')) { return; }

		if (config.TS) {
			// if some file was changed and its "ts" the transpile it !! 
			transpileTs(fileName[1], true);
		}

		// if caching is enabled and some files have changed then revalidate the request cache.
		if(config.cacheRequests){
			try {
				const pathToCacheFile = `./${config.rootEndPoint}/cache/${fileName[1].replaceAll('/', '').toLowerCase().replace('ts', 'js')}`;
				if (existsSync(pathToCacheFile)) {
					unlinkSync(pathToCacheFile);
				}
			} catch (error) { infoGreyDev('At index nodemon restart: ', error); }
		}
	});

console.log(chalk.gray(`
${chalk.bold.rgb(98, 0, 255)(`✦  Blazze.js v.${packageVersion} `)}
    ${greenArrow()} Local: ${chalk.cyanBright(`http://localhost:${config.port}/${config.rootEndPoint}`)}
    ${greenArrow()} Config: blaze.config.js
    ${greenArrow()} Request Caching: ${config.cacheRequests ? 'enabled' : 'disabled'}
    ${greenArrow()} Running in ${chalk.cyanBright(config.TS ? 'TypeScript' : 'JavaScript')}
`));

revalidateCache('Revalidating at server start');

/**
 *  // nodemon restarts the server whenever:
	//  @ There is change in the files in the rootEndPoint dir
	//  @ There is change in the files in the cache dir
	// -------------------------------------------------------------------------------------- //
	let theActualFile = file[0].replaceAll("\\","/").split(config.rootEndPoint)
	infoGreyDev(theActualFile)
	// if changed file was in the cache then "t" would have length 1, as there will be no split
	// we get a array of two 1st val is c/user../rootEndPonit and 2nd val is the dir/file that was changed
	if(config.TS && theActualFile.length > 1){
		try {
			let file = config.rootEndPoint+"/"+theActualFile[1].toLowerCase().replaceAll("ts","js")
			infoGreyDev("[THE FILE :::::::::::::::::]",file)
			if(existsSync(file))
				unlinkSync(file)
		}
		catch (error) {infoGreyDev("At index nodemon restart: ",error)}
		transpileTs(theActualFile[1], true)
	}

	// if(theActualFile.length < 2){
	//     errorRed("cachw was changed !!")
	// }

	// ----------------------------------- //

	errorRed(file)
		// no action for files in cache
		if (file[0].includes('cache')) { return; }

		// format of file is this ["c:/Users/yaksh/dist/api/v1/new/GET.ts"] hence modifying it !
		file = file[0].replaceAll('\\', '/').split(config.rootEndPoint);

		// after modification file = ["c:/Users/yaksh/dist/", "/new/GET.ts" ]
		// file[1] = "/new/GET.ts" which is my actual modified file 😌

		if (config.TS) {
			// if some file was changed and its "ts" the transpile it !! - 1st Todo
			transpileTs(file[1], true);
		}

		// delete its respective cache file so that cache can be revalidated in next req. - 2nd Todo
		try {
			const pathToCacheFile = `./${config.rootEndPoint}/cache/${file[1].replaceAll('/', '').replaceAll("ts","js").toLowerCase()}`;

			errorRed("CACHE FILE:",pathToCacheFile)
			// "/new/GET.ts" this will become "newget.js"
			// pathToCacheFile will be c:/Users/yaksh/dist/api/v1/cache/newget.js

			if (existsSync(pathToCacheFile)) {
				unlinkSync(pathToCacheFile);
			}
		} catch (error) { infoGreyDev('At index nodemon restart: ', error); }

 */
