import { describe, it, expect } from 'vitest'
import { isInvalidArgumentException, InvalidArgumentException } from '#exception/invalid_argument_exception'

describe('InvalidArgumentException tests', () => {
    it('Should create InvalidArgumentException', () => {
        const message = 'Something went wrong'
        const error = new InvalidArgumentException(message)

        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(message)
        expect(error.stack).toBe('InvalidArgumentException: ' + message)
        expect(error.name).toBe('InvalidArgumentException')
    })

    it('Should identify InvalidArgumentException', () => {
        const error = new InvalidArgumentException('Something went wrong')
        expect(isInvalidArgumentException(error)).toBe(true)

        const error2 = new Error('Something went wrong')
        expect(isInvalidArgumentException(error2)).toBe(false)
    })

    it('Should throw InvalidArgumentException', () => {
        expect(() => {
            throw new InvalidArgumentException('Something went wrong')
        }).toThrow(InvalidArgumentException)
    })
})