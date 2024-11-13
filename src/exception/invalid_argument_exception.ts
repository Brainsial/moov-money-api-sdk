export class InvalidArgumentException extends Error {

    constructor(message: string) {
        super(message)

        this.cause = message
        this.name = 'InvalidArgumentException'
        this.stack = 'InvalidArgumentException: ' + message
    }

}


export function isInvalidArgumentException(error: Error): error is InvalidArgumentException {
    return error instanceof InvalidArgumentException
}