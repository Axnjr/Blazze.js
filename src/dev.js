#!/usr/bin/env node
import express from "express";
import { existsSync, mkdirSync, readFileSync, watch, writeFileSync } from "fs";
import { chconf, errorRed, infoGreyDev, warning, safe, danger } from "./chconf.js"
import { revalidateCache } from "./cache.js";
import nodemon from "nodemon";

const config = await chconf()
const app = express();

// Extend the response object's prototype
express.response.logResponse = function (reqQuery,reqParams,body,route,method) {
    errorRed("CACHING REQUEST ....")
    if(!existsSync("cache")){
        mkdirSync("cache", {recursive:true})
    }

    let temp = route+"."+method

    // writeFileSync(config.resolvePath+"src/cache.Hint.json", JSON.stringify({
    //     temp:true
    // }))

    writeFileSync(`cache/${temp}.js`, `
        export const cache = ${JSON.stringify({
            Key: {
                query: reqQuery,
                params: reqParams
            },
            Value:body
        }, null , 4)}
    `)

    return;
};

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
                console.log('Something changed !!')
                if (event == "rename") {
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
        // // sub/join/_ids
     
        route = route.replaceAll("@","/").replaceAll("_",":")

        app.use(`/${config.rootEndPoint}/${route}`, async (req, res, next) => {
            let originalResSend = res.send
            res.send = function(body){
                originalResSend.apply(res, arguments)
                res.logResponse(req.query,req.params,body,originalRoute,method)
            }
            next();
        })

        // subs/join/:ids 
        app[method](`/${config.rootEndPoint}/${route}`, async (req, res) => {

            let cachedReq;

            try {
                cachedReq = await import("file:///"+process.cwd()+"/cache/"+originalRoute+"."+method+".js")
                const { Key, Value } = cachedReq.cache

                if(JSON.stringify(Key.query) == JSON.stringify(req.query)){
                    console.log("Cache hit !!")
                    res.send(Value)

                    return;
                }
            } 
            catch (error) {errorRed(error)}

            // a place to store cached requests
            // if req was in cache then return cached value
            // if req was not in cache then move it after executing
            console.log("Cache miss !!")
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

    isArrowFunc(func) {
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
        `file:///${process.cwd()}/blazze/.${route + "." + methodFile}.js`
            :
        `file:///${process.cwd()}/${config.rootEndPoint}/${route}/${methodFile}.js`

        let methodCallback = await import(pathToFile);

        if (methodCallback == undefined || methodCallback.default == undefined) {

            errorRed(`[Blaze Error]: No default function was exported from the "${methodFile}.${this.lang}" file in route "${route}". ${safe("Did you forgot to add export default ??")}`);

            process.exit(1);
        }

        if (this.isArrowFunc(methodCallback.default)) {
            warning(`[Blazze warning]: You are exporting a arrow functions from file ${route}/${methodFile}.${this.lang}, it could ${danger("cause build errors")} on running "npm run build". Consider ${safe("converting it normal function")} to fix this warning !!`)
        }

        return methodCallback.default;
    }

}

new Blaze();