import { SoapClient } from '#helper/soap_client'
import { describe, it, expect } from 'vitest'
import { TransferFlooz }  from '#action/transfer_flooz';
import { BadConfigurationException } from '#exception/bad_configuration_exception';

describe('TransferFlooz tests', () => {
    let action = TransferFlooz.init(new SoapClient({ baseUrl: `http://localhost:3355`}))

    it('Should throw an error when data is not provided', async () => {
        try {
            await action.execute()
            expect.fail('Should throw an error')
        } catch (error) {
            expect(error).toBeInstanceOf(BadConfigurationException)
            expect(error.message).toBe('Data is not defined')
        }
    })

    it('Should return the right xml envelop when data is provided', async () => {
        action = action.data({
            token: 'u+voBudlTCZr4BVj9UcTJOcF/GHH6GPTf2xs0PMZXs0=',
            destination: '22994512412',
            amount: 10,
            referenceid: '1234567890',
            data: 'remarks'
        })

        expect(action.requestXml).toMatchInlineSnapshot(`
          "<?xml version="1.0" encoding="utf-16"?>
                  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope" xmlns:api="http://api.merchant.tlc.com/">
                      <soapenv:Header/>
                      <soapenv:Body>
                          <api:transferFlooz>
                              <token>u+voBudlTCZr4BVj9UcTJOcF/GHH6GPTf2xs0PMZXs0=</token><request><destination>22994512412</destination><amount>10</amount><referenceid>1234567890</referenceid><walletid>0</walletid><extendeddata>remarks</extendeddata></request>
                          </api:transferFlooz>
                      </soapenv:Body>
                  </soapenv:Envelope>
                  "
        `)
    })

    it('Should return the expected response', async () => {
        try {
            const response = await action.execute()

            expect(response.data.status).toMatchInlineSnapshot(`"0"`)
            expect(response.description).toMatchInlineSnapshot(`"Success"`)
            expect(response.data.message).toMatchInlineSnapshot(`"Vous avez envoye 10.00 FCFA a 22994512412. Votre nouveau solde Flooz est de 16809.00 FCFA. Ref :920190616000000."`)
            expect(response.message).toMatchInlineSnapshot(`"Transaction Completed"`)
            expect(response.data.referenceid).toMatchInlineSnapshot(`"920190616000000"`)
        } catch (error) {
            expect.fail('Should throw an error')
        }
    })
})