#!/usr/bin/env node

import chalk from 'chalk';
import ora from 'ora';
import { input, confirm } from '@inquirer/prompts';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

async function BlazeInit() {

    const name = await input({
        message: chalk.greenBright("What is your project named ?"),
        default: "my-app"
    });
    const rootEndPoint = await input({
        message: chalk.whiteBright("What will be the root endpoint for your project ?"),
        default: "api/v1"
    });
    const TS = await confirm({
        message: chalk.whiteBright("Would you like to use " + chalk.magentaBright("TypeScript") + " ??"),
        default: false
    });
    const port = await input({
        message: chalk.whiteBright("Which port should the server listen to ?"),
        default: "3000"
    });
    const staticRoot = await input({
        message: chalk.whiteBright("Where would you like to keep your static conetent like html, png's files ?"),
        default: "public"
    });
    const spinner = ora(chalk.bgBlack.rgb(247,15,234)(" Configuring your Blazze App ")).start();

    await new Promise(resolve => { setTimeout(() => { resolve() }, 500) })

    writeFileSync("blaze.config.js", `export const blazeConfig = ${JSON.stringify({
        rootEndPoint: rootEndPoint,
        TS: TS,
        port: port,
        staticRoot: staticRoot
    }, null, 4)}`);

    if(!existsSync(rootEndPoint)){
        mkdirSync(rootEndPoint, { recursive: true });
    }

    const deps = TS ? {
        "express": "latest",
        "typescript":"latest",
        // "blazze":"latest",
        "dotenv": "latest"
    }
        :
    {
        "express": "latest",
        "typescript":"latest",
        // "blazze":"latest",
        "dotenv": "latest"
    }

    const devDeps = TS ? {
        "@types/express": "latest",
        "@types/node": "latest",
    } : {  }

    const packageJson = {
        "name": name,
        "version": "1.0.0",
        "private":true,
        "description": "Created from create-blazze-app",
        "main": "index.js",
        "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1",
          "dev": "blazze-dev",
          "build": "blazze-build"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "dependencies":deps,
        "devDependencies": devDeps,
        "type":"module"
    }

    writeFileSync("package.json", JSON.stringify(packageJson, null, 4))

    spinner.succeed();
    console.log(chalk.greenBright("Success !"),`Created ${name} at ${process.cwd()}`)
    console.log(chalk.whiteBright(`Run commands:

        - npm i
        - npm run dev
    `))
    console.log(chalk.bgBlack(chalk.rgb(247,15,234)(` You are ready to Blazze 🚀. Refer docs at http://blazze/docs. `)))

}

BlazeInit();