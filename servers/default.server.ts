import { Server,  createServer } from "node:http"
export class DefaultServer {

    protected _server: Server
    protected _port: number = 3000
    protected _started: boolean = false

    constructor() {
        this._server = createServer()
    }

    public start() {
        this._server.listen(this._port, '0.0.0.0')

        if (!this._started) {
            this._server.on('error', (err: NodeJS.ErrnoException) => {
                if (err.code === 'EADDRINUSE') {
                    this._port++
                    return this.start()
                }
            })

            this._started = true
        }


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

    get started(): boolean {
        return this._started
    }
}