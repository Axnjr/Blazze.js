import { infoGreyDev, chconf } from "./chconf.js";

import { readdirSync, writeFileSync } from "fs";

const config = await chconf() 

export function revalidateCache(opts) {

    var cache = { GET: [], POST: [], DELETE: [], PUT: [], PATCH: [] };
    infoGreyDev("o",opts)
    // first get all route folder from the root directory "api/v1" (default)
    const allRoutes = readdirSync(config.rootEndPoint);
    // for each route folder go deep and get its files (which are named as http methods ex: GET.js)
    allRoutes.forEach((route) => {

        let routeMethods = readdirSync(`${config.rootEndPoint}/${route}`);

        routeMethods = routeMethods.map(files => files.replace(/.js|.ts/, ""));
        // 1 - check if the route folder has a file GET for case 1, POST for case 2, so on ..
        // 2 - cache.get/post/delete does not include that route already.
        if (routeMethods.includes("GET") && !cache.GET.includes(route)) {
            cache.GET.push(route);
        }

        if (routeMethods.includes("POST") && !cache.POST.includes(route)) {
            cache.POST.push(route);
        }

        if (routeMethods.includes("DELETE") && !cache.DELETE.includes(route)) {
            cache.DELETE.push(route);
        }

        if (routeMethods.includes("PUT") && !cache.PUT.includes(route)) {
            cache.PUT.push(route);
        }

        if (routeMethods.includes("PATCH") && !cache.PATCH.includes(route)) {
            cache.PATCH.push(route);
        }
    });

    // update or create the blaze.cache.json
    try {
        writeFileSync("./blaze.cache.json",  JSON.stringify(cache, null, 4));
    } 
    
    catch (error) {
        infoGreyDev("Error occured at writting the file in cache")
        console.error(error)
        process.exit(1)
    }

    return;
}