import { Server,  createServer } from "node:http"
export class DefaultServer {

    protected _server: Server
    protected _port: number = 3000

    constructor() {
        this._server = createServer()
    }

    public start() {
        this._server.listen(this._port, '0.0.0.0')

        this._server.on('error', (err: NodeJS.ErrnoException) => {
            if (err.code === 'EADDRINUSE') {
                this._port++
                this.start()
            }
        })

        this._server.on('listening', () => {
            console.info(`Server started on port ${this._port}`);
        })

        this._server.on('close', () => {
            console.info(`Server stopped on port ${this._port}`);
        })

        
        return this
    }

    public stop() {
        this._server.close()
        return this
    }

    public get port(): number {
        return this._port
    }
}