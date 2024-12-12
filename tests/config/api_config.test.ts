import { describe, it, expect } from 'vitest'
import { ApiConfig } from '#config/api_config'

describe('ApiConfig tests', () => {
    it('Should return the correct values', () => {
        const apiConfig = new ApiConfig({
            username: 'myusername',
            password: 'mypassword',
            baseUrl: 'https://example.com',
        })

        expect(apiConfig.username).toBe('myusername')
        expect(apiConfig.password).toBe('mypassword')
        expect(apiConfig.baseUrl).toBe('https://example.com')
        expect(apiConfig.encryptionKey).toBe('tlc12345tlc12345tlc12345tlc12345')
        expect(apiConfig.requestTimeout).toBe(60)
    })

    it('Should checck valid values', () => {        
        const apiConfig = new ApiConfig({
            username: 'myusername',
            password: 'mypassword',
            baseUrl: 'https://example.com',
            encryptionKey: 'tlc12345tlc12345tlc12345tlc12345',
            requestTimeout: 60
        }) 

        expect(apiConfig.isValid).toBeTruthy()
    })
})