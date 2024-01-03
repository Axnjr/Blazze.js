#!/usr/bin/env node

import express from "express";

import { 
    existsSync,
    readFileSync,
    readdirSync, 
    writeFileSync, 
    watch 
} from "fs";

import { chconf, errorRed, infoCyan, infoYellowDev } from "./chconf.js"

const app = express();

const config = await chconf() 

class Blaze {

    cache;

    constructor() {

        this.cache = { GET: [], POST: [], DELETE: [], PUT: [], PATCH: [] };
        this._listenToChanges();
        try {
            // create cache if blaze.cache.json was not found
            if (!existsSync("./blaze.cache.json")) {
                infoYellowDev("Cache was not found !!")
                this._revalidateCache("CREATING CACHE !!");
            }

            this.cache = JSON.parse(readFileSync(`./blaze.cache.json`, "utf-8"));
        }

        catch (error) {
            infoYellowDev("[ BLAZZE ERROR AT READING CACHE: CONSTRUCTOR() ]")
            errorRed("[BLAZE ERROR] -", error);
            process.exit(1);
        }

        this._startBlazeServer();
        return;
    }

    _listenToChanges() {
        watch(config.rootEndPoint, { recursive: true, persistent: false })
        .on("change", (event, file) => {

            if(event == "rename"){
                infoYellowDev("[A new route has been created or deleted revalidating cache !!]")
                this._revalidateCache("Revalidating ...")
            }

            infoYellowDev(event, file);
        });
    }

    _revalidateCache(opts) {

        if (opts == "rename") {
            this.cache = { GET: [], POST: [], DELETE: [], PUT: [], PATCH: [] };
        }
        // first get all route folder from the root directory "api/v1" (default)
        const allRoutes = readdirSync(config.rootEndPoint);
        // for each route folder go deep and get its files (which are named as http methods ex: GET.js)
        allRoutes.forEach((route) => {

            let routeMethods = readdirSync(`${config.rootEndPoint}/${route}`);

            routeMethods = routeMethods.map(files => files.replace(/.js|.ts/, ""));
            // 1 - check if the route folder has a file GET for case 1, POST for case 2, so on ..
            // 2 - cache.get/post/delete does not include that route already.
            if (routeMethods.includes("GET") && !this.cache.GET.includes(route)) {
                this.cache.GET.push(route);
            }

            if (routeMethods.includes("POST") && !this.cache.POST.includes(route)) {
                this.cache.POST.push(route);
            }

            if (routeMethods.includes("DELETE") && !this.cache.DELETE.includes(route)) {
                this.cache.DELETE.push(route);
            }

            if (routeMethods.includes("PUT") && !this.cache.PUT.includes(route)) {
                this.cache.PUT.push(route);
            }

            if (routeMethods.includes("PATCH") && !this.cache.PATCH.includes(route)) {
                this.cache.PATCH.push(route);
            }
        });

        // update or create the blaze.cache.json
        try {
            writeFileSync("./blaze.cache.json",  JSON.stringify(this.cache, null, 4));
        } 
        
        catch (error) {
            infoYellowDev("Error occured at writting the file in index : 115")
            console.error(error)
            process.exit(1)
        }

        return;
    }

    _startBlazeServer() {
        for (const [method, routes] of Object.entries(this.cache)) {
            switch (true) {
                case method == "GET":
                    this._registerRequests(routes, "get");
                    break;
                case method == "POST":
                    this._registerRequests(routes, "post");
                    break;
                case method == "DELETE":
                    this._registerRequests(routes, "delete");
                    break;
                case method == "PUT":
                    this._registerRequests(routes, "put");
                    break;
                case method == "PATCH":
                    this._registerRequests(routes, "patch");
                    break;
                default: break;
            }
        }

        app.use(express.static(config.staticRoot ?? "public"));
        app.listen(config.port);
        return;
    }

    _registerRequests(routes, method) {
        routes.forEach(route => {
            this._dynamicExpressExecuter(method, route);
        });

        return;
    }

    _dynamicExpressExecuter(method, route) {
        let methodFile = method.toUpperCase(), originalRoute = route;
        // If Route is /subs/join/:id then it is represented as subs@join@_ids
        if (route.includes("@")) {
            route = route.replaceAll("@", "/");
        }
        // sub/join/_ids
        if (route.includes("_")) {
            route = route.replaceAll("_", ":");
        }
        // subs/join/:ids 
        app[method](`/${config.rootEndPoint}/${route}`, async (req, res) => {
            let getCallback = await this._getMethodCallback(originalRoute, methodFile);
            try {
                // dynamic route params can be accessed from req.params.paramName ex : req.params.users
                await getCallback(req, res);
            }

            catch (error) { // error in function
                errorRed(`[Blaze Error at ${methodFile} in route ${route}] - ${error}`);

                res.status(500).send(JSON.stringify({
                    message: "Something went wrong !",
                    Error: error,
                    status: 500
                }));
            }
        });
    }

    async _getMethodCallback(route, methodFile) {
        let methodCallback = await import(`file:///${process.cwd().replace(/\\/g, '/')}/${config.rootEndPoint}/${route}/${methodFile}.js`);

        if (methodCallback == undefined || methodCallback.default == undefined) {

            errorRed(`
				[Blaze Error] - No default function was exported from the "${methodFile}.js/.ts"
				file in route "${route}". Did you forgot to add export default ??
			`);

            process.exit(1);
        }   

        return methodCallback.default;
    }

}

new Blaze();