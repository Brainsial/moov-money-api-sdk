import { describe, it, expect} from 'vitest'

import { PushTracsactionWithPending }  from '#action/push_transaction_with_pending';
import { SoapClient } from '#helper/soap_client';
import { BadConfigurationException } from '#exception/bad_configuration_exception';

describe('PushTransactionWithPending tests', () => {
    let action = PushTracsactionWithPending.init(new SoapClient({ baseUrl: `http://localhost:3355`}))


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
            msisdn: '22994512412',
            message: 'Please input your password',
            amount: 100,
            fee: 0
        })

        expect(action.requestXml).toMatchInlineSnapshot(`
          "<?xml version="1.0" encoding="utf-16"?>
                  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope" xmlns:api="http://api.merchant.tlc.com/">
                      <soapenv:Header/>
                      <soapenv:Body>
                          <api:PushWithPending>
                              <token>u+voBudlTCZr4BVj9UcTJOcF/GHH6GPTf2xs0PMZXs0=</token><msisdn>22994512412</msisdn><message>Please input your password</message><amount>100</amount><externaldata1></externaldata1><externaldata2></externaldata2><fee>0</fee>
                          </api:PushWithPending>
                      </soapenv:Body>
                  </soapenv:Envelope>
                  "
        `)
    })

    it('Should return the expected response (suscess)', async () => {
        try {
            const response = await action.execute()
            

            expect(response.message).toMatchInlineSnapshot(`"Transaction Completed"`)
            expect(response.data.status).toMatchInlineSnapshot(`"0"`)
            expect(response.description).toMatchInlineSnapshot(`"Success"`)
            expect(response.data.description).toMatchInlineSnapshot(`"SUCCESS"`)
            expect(response.data.transid).toMatchInlineSnapshot(`"pi_NyM_1642619082990"`)
            expect(response.data.referenceid).toMatchInlineSnapshot(`"720220120000006"`)
        } catch (error) {
            expect.fail('Should throw an error')
        }
    })

    it('Should return the expected response (pending)', async () => {
        action = action.data({
            token: 'u+voBudlTCZr4BVj9UcTJOcF/GHH6GPTf2xs0PMZXs0=',
            msisdn: '22995155936',
            message: 'Please input your password',
            amount: 100,
            fee: 0
        })

        try {
            const response = await action.execute()
            expect(response.message).toMatchInlineSnapshot(`"In pending state"`)
            expect(response.data.status).toMatchInlineSnapshot(`"100"`)
            expect(response.description).toMatchInlineSnapshot(`"In pending state"`)
            expect(response.data.description).toMatchInlineSnapshot(`"IN PENDING STATE"`)
        } catch (error) {
            expect.fail('Should throw an error')
        }
    })

})