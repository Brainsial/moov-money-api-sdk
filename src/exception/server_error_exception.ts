export class ServerErrorException extends Error {
    constructor(message: string) {
        super(message)
        
        this.cause = message
        this.name = 'ServerErrorException'
        this.stack = 'ServerErrorException: ' + message
    }
}

export function isServerErrorException(error: Error): error is ServerErrorException {
    return error instanceof ServerErrorException
}