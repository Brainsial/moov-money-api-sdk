import { describe, it, expect} from 'vitest'

import { CashInTranbsaction }  from '#action/cash_in_transaction';
import { SoapClient } from '#helper/soap_client';
import { BadConfigurationException } from '#exception/bad_configuration_exception';

describe('CashInTranbsaction tests', () => {
    let action = CashInTranbsaction.init(new SoapClient({ baseUrl: `http://localhost:3355`}))


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
            amount: 500,
            referenceid: '1000000000000',
            remarks: 'test'
        })

        expect(action.requestXml).toMatchInlineSnapshot(`
          "<?xml version="1.0" encoding="utf-16"?>
                  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope" xmlns:api="http://api.merchant.tlc.com/">
                      <soapenv:Header/>
                      <soapenv:Body>
                          <api:cashintrans>
                              <token>u+voBudlTCZr4BVj9UcTJOcF/GHH6GPTf2xs0PMZXs0=</token><request><destination>22994512412</destination><amount>500</amount><referenceid>1000000000000</referenceid><remarks>test</remarks></request>
                          </api:cashintrans>
                      </soapenv:Body>
                  </soapenv:Envelope>
                  "
        `)
    })

    it('Should return the expected response', async () => {
        try {
            const response = await action.execute()

            expect(response.data.status).toMatchInlineSnapshot(`"0"`)
            expect(response.data.referenceid).toMatchInlineSnapshot(`"1000000000000"`)
            expect(response.data.transid).toMatchInlineSnapshot(`"020190628000017"`)
            expect(response.description).toMatchInlineSnapshot(`"Success"`)
            expect(response.data.message).toMatchInlineSnapshot(`"Vous avez envoye 500.00 FCFA a ARIZALA REUGIE 22994512412.Commission recue Hors Taxe. Votre nouveau solde Moov Money est de 96700.00 FCFA. Ref :020190628000017."`)
            expect(response.message).toMatchInlineSnapshot(`"Transaction Completed"`)
        } catch (error) {
            expect.fail('Should throw an error')
        }
    })
})