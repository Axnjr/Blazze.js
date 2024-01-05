export interface config {
    rootEndPoint: string;
    TS: string;
    port: string;
    staticRoot: string;
}
export function chconf() : Promise<config>
export function whiteMessage() : void
export function warning() : void
export function safe() : void
export function danger() : void
export function errorRed() : void
export function infoGreyDev() : void