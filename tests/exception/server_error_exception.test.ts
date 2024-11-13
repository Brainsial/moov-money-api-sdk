import { describe, it, expect } from 'vitest'
import { isServerErrorException, ServerErrorException  } from '#exception/server_error_exception'

describe('ServerErrorException tests', () => {

    it('Should create ServerErrorException', () => {
        const message = 'Something went wrong'
        const error = new ServerErrorException(message)

        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(message)
        expect(error.stack).toBe('ServerErrorException: ' + message)
        expect(error.name).toBe('ServerErrorException')
    })

    it('Should identify ServerErrorException', () => {
        const error = new ServerErrorException('Something went wrong')
        expect(isServerErrorException(error)).toBe(true)

        const error2 = new Error('Something went wrong')
        expect(isServerErrorException(error2)).toBe(false)
    })

    it('Should throw ServerErrorException', () => {
        expect(() => {
            throw new ServerErrorException('Something went wrong')
        }).toThrow(ServerErrorException)
    })
})

