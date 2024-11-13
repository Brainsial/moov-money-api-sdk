import { describe, it, expect } from 'vitest'
import { ApiStatus } from '#common/api_status'

describe('Api status tests', () => {
    const apistatus = new ApiStatus()

    it('Should return the correct description', () => {
        expect(apistatus.getDescription('0')).toBe('Success')
    })

    it('Should return the correct long description', () => {
        expect(apistatus.getLongDescription('0')).toBe('Transaction Completed')
    })
})
