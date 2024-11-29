import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { SoapMethodsTestServer } from '#server/soap_methods_test.server'
import { SoapClient } from '#helper/soap_client'
import { XMLFormater } from '#helper/xml_formater'

describe('SoapClient tests', () => {
    let server = new SoapMethodsTestServer()
    const client = new SoapClient({ baseUrl: `http://localhost:${server.port}`})

    type Response = {
        return: {
            method: string
            message: string
        }
    }

    beforeAll(() => {
        server = server.start()
    })

    afterAll(() => {
        server.stop()
    })


    it('Should return the correct response in Get method ', async () => {
        const response = await client.get<Response>() 
        expect(response.return).toEqual({ method: 'GET', message: 'call received' })
    })

    it('Should return the correct response in Post method ', async () => {
        const response = await client.post<Response>(XMLFormater.objectToSoapEnvelop('transferFlooz', { message: 'Hello World' }))
        expect(response.return).toEqual({ method: 'POST', message: 'Body received' })
    })

    it('Should return the correct response in Put method ', async () => {
        const response = await client.put<Response>(XMLFormater.objectToSoapEnvelop('api:transferFlooz', { message: 'Hello World' }))
        expect(response.return).toEqual({ method: 'PUT', message: 'Body received' })
    })

    it('Should return the correct response in Delete method ', async () => {
        const response = await client.delete<Response>()
        expect(response.return).toEqual({ method: 'DELETE', message: 'call received' })
    })
})