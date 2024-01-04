import chalk from "chalk";
import {} from 'dotenv/config'

const config = {
    rootEndPoint:"api/v1",
    TS:true,
    port:3000,
    staticRoot:"public"
}

export const errorRed = (...args) => { 
    console.error(chalk.redBright(...args)); 
};

export const whiteMessage = (...args) => {
    console.log(chalk.whiteBright(...args))
}

export const infoGreyDev = (...args) => {
    if(process.env.devEnviroment == "true")
        console.log(chalk.gray(...args)) 
};

export async function chconf() {
    let temp;
    try {
        temp = await import(`file:///${process.cwd().replace(/\\/g, '/')}/blaze.config.js`)
    }
    catch (error) {
        errorRed("[Blazze can't find config file, Run `npx blazze init` to create one]")
        process.exit(1)
        return config
    }
    return temp.blazeConfig ?? config
}