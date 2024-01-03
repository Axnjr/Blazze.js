export interface config {
    rootEndPoint: string;
    TS: string;
    port: string;
    staticRoot: string;
}

export async function chconf() : config