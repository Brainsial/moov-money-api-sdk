import { describe, it, expect } from 'vitest'
import { SoapMethodsTestServer } from '#server/soap_methods_test.server'
import { SoapClient } from '#helper/soap_client'
import { XMLFormater } from '#helper/xml_formater'

const server = new SoapMethodsTestServer().start()

describe('SoapClient tests', () => {
    const client = new SoapClient({ baseUrl: `http://localhost:${server.port}`})

    type Response = {
        return: {
            method: string
            message: string
        }
    }

    it('Should return the correct response in Get method ', async () => {
        const response = await client.get<Response>() 

        expect(response.success).toBe(true)
        expect(response.data?.return).toEqual({ method: 'GET', message: 'call received' })
    })

    it('Should return the correct response in Post method ', async () => {
        const response = await client.post<Response>(XMLFormater.objectToSoapEnvelop('transferFlooz', { message: 'Hello World' }))

        expect(response.success).toBe(true)
        expect(response.data?.return).toEqual({ method: 'POST', message: 'Body received' })
    })

    it('Should return the correct response in Put method ', async () => {
        const response = await client.put<Response>(XMLFormater.objectToSoapEnvelop('api:transferFlooz', { message: 'Hello World' }))

        expect(response.success).toBe(true)
        expect(response.data?.return).toEqual({ method: 'PUT', message: 'Body received' })
    })

    it('Should return the correct response in Delete method ', async () => {
        const response = await client.delete<Response>()

        expect(response.success).toBe(true)
        expect(response.data?.return).toEqual({ method: 'DELETE', message: 'call received' })
    })


    // server.stop()
})