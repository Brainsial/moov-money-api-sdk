import { describe, it, expect } from 'vitest'
import { isBadConfigurationException, BadConfigurationException } from '#exception/bad_configuration_exception'

describe('BadConfigurationException tests', () => {
    it('Should create BadConfigurationException', () => {
        const message = 'Something went wrong'
        const error = new BadConfigurationException(message)

        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(message)
        expect(error.stack).toBe('BadConfigurationException: ' + message)
        expect(error.name).toBe('BadConfigurationException')
    })

    it('Should identify BadConfigurationException', () => {
        const error = new BadConfigurationException('Something went wrong')
        expect(isBadConfigurationException(error)).toBe(true)

        const error2 = new Error('Something went wrong')
        expect(isBadConfigurationException(error2)).toBe(false)
    })

    it('Should throw BadConfigurationException', () => {
        expect(() => {
            throw new BadConfigurationException('Something went wrong')
        }).toThrow(BadConfigurationException)
    })
})