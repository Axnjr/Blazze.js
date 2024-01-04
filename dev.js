#!/usr/bin/env node

import express from "express";
import { readFileSync, watch } from "fs";
import { chconf, errorRed, infoGreyDev } from "./chconf.js"
import { revalidateCache } from "./cache.js";

const app = express();

const config = await chconf() 

class Blaze {

    cache;

    constructor() {
        // this.cache = { GET: [], POST: [], DELETE: [], PUT: [], PATCH: [] };
        this._listenToChanges();
        this.cache = JSON.parse(readFileSync(`./blaze.cache.json`, "utf-8"));
        this._startBlazeServer();
        return;
    }

    _listenToChanges() {
        watch(config.rootEndPoint, { recursive: true, persistent: false })
        .on("change", (event) => {
            if(event == "rename"){
                infoGreyDev("[A new route has been created or deleted revalidating cache !!]")
                revalidateCache("Revalidating ...")
            }
        });
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