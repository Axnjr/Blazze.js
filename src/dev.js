#!/usr/bin/env node
import express from "express";
import { readFileSync, watch } from "fs";
import { chconf, errorRed, infoGreyDev, warning, safe, danger } from "./chconf.js"
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
        this.lang = config.TS ? "ts" : "js";
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

    isArrowFunc(func){
        // this is for dev edge case swc transpilation problem
        // let b = func.toString().includes("return")
        // for arrow functions hasOwnPoperty would be false and true for normal funcs
        let t = func.prototype == undefined && !func.hasOwnProperty('arguments');
        // console.log("Checking if arrow func",func.toString(),t)
        // return b || t
        return t
    }

    async _getMethodCallback(route, methodFile) {

        let pathToFile = this.lang == "ts" 
            ? 
        `file:///${process.cwd()}/blazze/.${route+"."+methodFile}.js`
            :
        `file:///${process.cwd()}/${config.rootEndPoint}/${route}/${methodFile}.js`

        let methodCallback = await import(pathToFile);

        if (methodCallback == undefined || methodCallback.default == undefined) {

            errorRed(`[Blaze Error]: No default function was exported from the "${methodFile}.${this.lang}" file in route "${route}". ${safe("Did you forgot to add export default ??")}`);

            process.exit(1);
        }   

        if(this.isArrowFunc(methodCallback.default)){
            warning(`[Blazze warning]: You are exporting a arrow functions from file ${route}/${methodFile}.${this.lang}, it could ${danger("cause build errors")} on running "npm run build". Consider ${safe("converting it normal function")} to fix this warning !!`)
        }

        return methodCallback.default;
    }

}

new Blaze();