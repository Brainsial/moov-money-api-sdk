import { describe, it, expect} from 'vitest'

import { PushTracsaction }  from '#action/push_transaction';
import { SoapClient } from '#helper/soap_client';
import { BadConfigurationException } from '#exception/bad_configuration_exception';

describe('PushTransaction tests', () => {
    let action = PushTracsaction.init(new SoapClient({ baseUrl: `http://localhost:3355`}))


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
            msisdn: '22995155936',
            message: 'Please input your password',
            amount: 100,
            fee: 0
        })

        expect(action.requestXml).toMatchInlineSnapshot(`
          "<?xml version="1.0" encoding="utf-16"?>
                  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope" xmlns:api="http://api.merchant.tlc.com/">
                      <soapenv:Header/>
                      <soapenv:Body>
                          <api:Push>
                              <token>u+voBudlTCZr4BVj9UcTJOcF/GHH6GPTf2xs0PMZXs0=</token><msisdn>22995155936</msisdn><message>Please input your password</message><amount>100</amount><externaldata1></externaldata1><externaldata2></externaldata2><fee>0</fee>
                          </api:Push>
                      </soapenv:Body>
                  </soapenv:Envelope>
                  "
        `)
    })

    it('Should return the expected response', async () => {
        try {
            const response = await action.execute()

            expect(response.data.status).toBe(`0`)
            expect(response.description).toBe(`Success`)
            expect(response.data.message).toBe(`SUCCESS`)
            expect(response.message).toBe(`Transaction Completed`)
            expect(response.data.referenceid).toBe(`0009993544647`)
        } catch (error) {
            expect.fail('Should throw an error')
        }
    })
})