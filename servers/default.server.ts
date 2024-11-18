import { Server,  createServer } from "node:http"
export class DefaultServer {

    protected _server: Server
    protected _port: number = 3000

    constructor() {
        this._server = createServer()
    }

    public start() {
        this._server.listen(this._port, '0.0.0.0')
        console.log(`Server started on port ${this._port}`);
        
        return this
    }

    public stop() {
        this._server.close()
        console.log(`Server stopped on port ${this._port}`);
        
        return this
    }

    public get port(): number {
        return this._port
    }
}