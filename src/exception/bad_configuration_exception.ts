export class BadConfigurationException extends Error {
    constructor(message: string) {
        super(message)

        this.cause = message
        this.name = 'BadConfigurationException'
        this.stack = 'BadConfigurationException: ' + message
    }
}


export function isBadConfigurationException(error: Error): error is BadConfigurationException {
    return error instanceof BadConfigurationException
}