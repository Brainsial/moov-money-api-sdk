export interface ServerErrorException extends Error {

}

export function ServerErrorException(message: string): ServerErrorException {
    let error = new Error(message) as ServerErrorException
    error.stack = 'ServerErrorException: ' + message
    error.name = 'ServerErrorException'
    error.message = message
    error.cause = message

    return error
}

export function isServerErrorException(error: Error): error is ServerErrorException {
    return error instanceof ServerErrorException
}