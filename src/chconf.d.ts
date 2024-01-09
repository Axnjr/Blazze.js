export interface config {
    rootEndPoint: string;
    TS: boolean;
    port: string;
    staticRoot: string;
    resolvePath:string;
    cacheRequests:boolean;
}
export function chconf() : Promise<config>
export function whiteMessage() : void
export function warning() : void
export function safe() : void
export function danger() : void
export function errorRed() : void
export function infoGreyDev() : void