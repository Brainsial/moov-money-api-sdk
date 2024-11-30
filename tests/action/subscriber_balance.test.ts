import { describe, it, expect} from 'vitest'

import { SubscriberBalance }  from '#action/subscriber_balance';
import { SoapClient } from '#helper/soap_client';
import { BadConfigurationException } from '#exception/bad_configuration_exception';

describe('SubscriberBalance tests', () => {
    let action = SubscriberBalance.init(new SoapClient({ baseUrl: `http://localhost:3355`}))

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
            msisdn: '22994512412'
        })

        expect(action.requestXml).toMatchInlineSnapshot(`
          "<?xml version="1.0" encoding="utf-16"?>
                  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope" xmlns:api="http://api.merchant.tlc.com/">
                      <soapenv:Header/>
                      <soapenv:Body>
                          <api:getBalance>
                              <token>u+voBudlTCZr4BVj9UcTJOcF/GHH6GPTf2xs0PMZXs0=</token><request><msisdn>22994512412</msisdn></request>
                          </api:getBalance>
                      </soapenv:Body>
                  </soapenv:Envelope>
                  "
        `)
    })

    it('Should return the expected response', async () => {
        try {
            const response = await action.execute()

            expect(response.message).toBe(`Transaction Completed`)
            expect(response.description).toBe(`Success`)
            expect(response.data.status).toBe(`0`)
            expect(response.data.message).toBe(`SUCCESS`)
            expect(response.data.balance).toBe(`382222`)

        } catch (error) {
            expect.fail('Should throw an error')
        }
    })
})