import { describe, it, expect} from 'vitest'

import { MobileStatus }  from '#action/mobile_status';
import { SoapClient } from '#helper/soap_client';
import { BadConfigurationException } from '#exception/bad_configuration_exception';

describe('MobileStatus tests', () => {
    let action = MobileStatus.init(new SoapClient({ baseUrl: `http://localhost:3355`}))


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
        })

        expect(action.requestXml).toMatchInlineSnapshot(`
          "<?xml version="1.0" encoding="utf-16"?>
                  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope" xmlns:api="http://api.merchant.tlc.com/">
                      <soapenv:Header/>
                      <soapenv:Body>
                          <api:getMobileAccountStatus>
                              <token>u+voBudlTCZr4BVj9UcTJOcF/GHH6GPTf2xs0PMZXs0=</token><request><msisdn>22994512412</msisdn></request>
                          </api:getMobileAccountStatus>
                      </soapenv:Body>
                  </soapenv:Envelope>
                  "
        `)
    })

    it('Should return the expected response', async () => {
        try {
            const response = await action.execute()

            expect(response.data.status).toMatchInlineSnapshot(`"0"`)
            expect(response.data.accounttype).toMatchInlineSnapshot(`"MCOM"`)
            expect(response.data.allowedtransfer).toMatchInlineSnapshot(`"0"`)
            expect(response.data.city).toMatchInlineSnapshot(`"COTONOU"`)
            expect(response.data.dateofbirth).toMatchInlineSnapshot(`"1987-11-01 00:00:00.0"`)
            expect(response.data.firstname).toMatchInlineSnapshot(`"REUGIE"`)
            expect(response.data.lastname).toMatchInlineSnapshot(`"ARIZALA"`)
            expect(response.data.region).toMatchInlineSnapshot(`"ATLANTIQUE"`)
            expect(response.data.secondname).toMatchInlineSnapshot(`""`)
            expect(response.data.street).toMatchInlineSnapshot(`"ST JEAN I (MINFFONGOU)"`)
            expect(response.data.subcriberstatus).toMatchInlineSnapshot(`undefined`)
            expect(response.description).toMatchInlineSnapshot(`"Success"`)
            expect(response.data.message).toMatchInlineSnapshot(`"SUCCESS"`)
            expect(response.message).toMatchInlineSnapshot(`"Transaction Completed"`)
        } catch (error) {
            expect.fail('Should throw an error')
        }
    })
})