#!/usr/bin/env node
import express from 'express';
import {
	existsSync, mkdirSync, readFileSync, watch, writeFileSync,
} from 'fs';
import helmet from 'helmet';
import {
	chconf, errorRed, infoGreyDev, warning, safe, danger,
} from './chconf.js';
import { revalidateCache } from './cache.js';

const config = await chconf();
const app = express(helmet(config.helmetConfig ?? undefined));

// Extend the response object's prototype
express.response.logResponse = function (reqQuery, reqParams, body, route, method) {
	if (!existsSync(`${config.rootEndPoint}/cache`)) { mkdirSync(`${config.rootEndPoint}/cache`, { recursive: true }); }

	const temp = route + method;

	try {
		writeFileSync(`${config.rootEndPoint}/cache/${temp}.js`, `
		/* eslint-disable indent */
        export const cache = ${JSON.stringify({
		Key: {
			query: reqQuery,
			params: reqParams,
		},
		Value: body,
	}, null, 4)}`);
	} catch (error) {
		infoGreyDev(error)
	}

};

class Blaze {
	constructor() {
		this._listenToChanges();
		this.cache = JSON.parse(readFileSync('./blaze.cache.json', 'utf-8'));
		this._startBlazeServer();
		this.lang = config.TS ? 'ts' : 'js';
	}

	_listenToChanges() {
		watch(config.rootEndPoint, { recursive: true, persistent: false })
			.on('change', (event) => {
				if (event == 'rename') {
					infoGreyDev('[A new route has been created or deleted revalidating cache !!]');
					revalidateCache('Revalidating ...');
				}
			});
	}

	_startBlazeServer() {
		for (const [method, routes] of Object.entries(this.cache)) {
			switch (true) {
			case method == 'GET':
				this._registerRequests(routes, 'get');
				break;
			case method == 'POST':
				this._registerRequests(routes, 'post');
				break;
			case method == 'DELETE':
				this._registerRequests(routes, 'delete');
				break;
			case method == 'PUT':
				this._registerRequests(routes, 'put');
				break;
			case method == 'PATCH':
				this._registerRequests(routes, 'patch');
				break;
			default: break;
			}
		}

		app.use(express.static(config.staticRoot ?? 'public'));
		app.listen(config.port);
	}

	_registerRequests(routes, method) {
		routes.forEach((route) => {
			this._dynamicExpressExecuter(method, route);
		});
	}

	_dynamicExpressExecuter(method, route) {
		const methodFile = method.toUpperCase(), originalRoute = route;
		// If Route is /subs/join/:id then it is represented as subs@join@_ids
		route = route.replaceAll('@', '/').replaceAll('_', ':');

		// if caching enabled then to cache requests 
		if(config.cacheRequests){
			app.use('/', async (req, res, next) => {
				this._cacheMiddleware(req, res, next, originalRoute, method);
			});
		}

		// subs/join/:ids
		app[method](`/${config.rootEndPoint}/${route}`, async (req, res) => {
			if(config.cacheRequests){
				// if req was in cache then return cached value
				if (await this._checkRequestCache(req, res, originalRoute, method)) { return; }
			}
			// if req was not in cache then move it after executing
			const getCallback = await this._getMethodCallback(originalRoute, method);

			try { await getCallback(req, res) } 
			// catch error in function
			catch (error) { 
				errorRed(`[Blaze Error at ${methodFile} in route ${route}] - ${error}`);
				res.status(500).send(JSON.stringify({
					message: 'Something went wrong !',
					Error: error,
					status: 500,
				}));
			}
		});
	}

	_cacheMiddleware(req, res, next, originalRoute, method) {
		const originalResSend = res.send;
		res.send = function (body) {
			originalResSend.apply(res, arguments);
			res.logResponse(req.query, req.params, body, originalRoute, method);
		};
		next();
	}

	async _checkRequestCache(req, res, originalRoute, method) {
		let cachedReq;

		if (existsSync(`${config.rootEndPoint}/cache/${originalRoute}${method}.js`)) {
			try {
				const pathToCache = `file:///${process.cwd()}/${config.rootEndPoint}/cache/${originalRoute}${method}.js`;

				cachedReq = await import(pathToCache);

				const { Key, Value } = cachedReq.cache;

				if (JSON.stringify(Key.query) == JSON.stringify(req.query)) {
					console.log(safe('Cache HIT ✓'));
					// send the cached value
					res.send(Value);

					return true; // true means success
				}
			} catch (error) { infoGreyDev('At dev: ====', error); }
		}

		return false;
	}

	isArrowFunc(func) {
		// this is for dev edge case swc transpilation problem
		// let b = func.toString().includes("return")
		// for arrow functions hasOwnPoperty would be false and true for normal funcs
		// eslint-disable-next-line no-prototype-builtins
		const t = func.prototype == undefined && !func.hasOwnProperty('arguments');
		// console.log("Checking if arrow func",func.toString(),t)
		// return b || t
		return t;
	}

	async _getMethodCallback(route, methodFile) {

		const pathToFile = this.lang == 'ts'
			? `file:///${process.cwd()}/blazze/${route + methodFile}.js`
			: `file:///${process.cwd()}/${config.rootEndPoint}/${route}/${methodFile}.js`
		;

		infoGreyDev(pathToFile)

		const methodCallback = await import(pathToFile);

		if (methodCallback == undefined || methodCallback.default == undefined) {
			errorRed(`[Blaze Error]: No default function was exported from the "${methodFile}.${this.lang}" file in route "${route}". ${safe('Did you forgot to add export default ??')}`);

			process.exit(1);
		}

		if (this.isArrowFunc(methodCallback.default)) {
			warning(`[Blazze warning]: You are exporting a arrow functions from file ${route}/${methodFile}.${this.lang}, it could ${danger('cause build errors')} on running "npm run build". Consider ${safe('converting it normal function')} to fix this warning !!`);
		}

		return methodCallback.default;
	}
}

new Blaze();
