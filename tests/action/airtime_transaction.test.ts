import { describe, it, expect} from 'vitest'

import { AirtimeTransaction }  from '#action/airtime_transaction';
import { SoapClient } from '#helper/soap_client';
import { BadConfigurationException } from '#exception/bad_configuration_exception';

describe('AirtimeTransaction tests', () => {
    let action = AirtimeTransaction.init(new SoapClient({ baseUrl: `http://localhost:3355`}))


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
            amount: 200,
            referenceid: '120000000',
            remarks: 'TEST'
        })

        expect(action.requestXml).toMatchInlineSnapshot(`
          "<?xml version="1.0" encoding="utf-16"?>
                  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope" xmlns:api="http://api.merchant.tlc.com/">
                      <soapenv:Header/>
                      <soapenv:Body>
                          <api:airtimetrans>
                              <token>u+voBudlTCZr4BVj9UcTJOcF/GHH6GPTf2xs0PMZXs0=</token><request><destination>22994512412</destination><amount>200</amount><referenceid>120000000</referenceid><remarks>TEST</remarks></request>
                          </api:airtimetrans>
                      </soapenv:Body>
                  </soapenv:Envelope>
                  "
        `)
    })

    it('Should return the expected response', async () => {
        try {
            const response = await action.execute()

            expect(response.data.status).toMatchInlineSnapshot(`"0"`)
            expect(response.data.referenceid).toMatchInlineSnapshot(`"120000000"`)
            expect(response.data.transid).toMatchInlineSnapshot(`"020190628000024"`)
            expect(response.description).toMatchInlineSnapshot(`"Success"`)
            expect(response.data.message).toMatchInlineSnapshot(`"Vous avez recharge de 200.00 FCFA le 22994512412. Votre commission est de 8.00F Votre nouveau solde Flooz est de 95200.00 FCFA. Cout de la transaction 0 FCFA. Ref :020190628000024."`)
            expect(response.message).toMatchInlineSnapshot(`"Transaction Completed"`)
        } catch (error) {
            expect.fail('Should throw an error')
        }
    })
})