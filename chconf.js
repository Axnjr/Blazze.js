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

export const infoCyan = (...args) => { 
    console.log(chalk.cyanBright(...args)); 
};

export const infoYellowDev = (...args) => {
    if(process.env.devEnviroment == "true")
        console.log(chalk.yellowBright(...args)) 
};

export const warn = (...args) => { 
    console.log(chalk.yellowBright(...args)); 
};

export async function chconf() {
    let temp;
    try {
        temp = await import(`file:///${process.cwd().replace(/\\/g, '/')}/blaze.config.js`)
    }
    catch (error) {
        // warn(`[ ⚠️  Blaze Warning: Cannot read blaze.config.js starting server with default configurations ] - ${JSON.stringify(config, null, 4)}`, "\n")
        return config
    }
    return temp.blazeConfig ?? config
}