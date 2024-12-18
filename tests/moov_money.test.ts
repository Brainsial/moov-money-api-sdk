import { describe, it, expect } from 'vitest'

import { MoovMoneyAPi } from '../src/moov_money_api'
import { BadConfigurationException } from '#exception/bad_configuration_exception'
import { SoapClient } from '#helper/soap_client'
import { ApiConfig } from '#config/api_config'

describe('MoovMoneyAPi tests', () => {
    let moovMoneyApi: MoovMoneyAPi

    const wrongConfig = {
        username: 'username', 
        password: 'password',
    }

    it('Should throw an error when configuration is invalid (constructor)', () => {
        try {
            moovMoneyApi = new MoovMoneyAPi(new ApiConfig(wrongConfig))
            expect.fail('Should throw an error')
        } catch (error) {
            expect(error).toBeInstanceOf(BadConfigurationException)
            expect(error.message).toBe('Api configuration is invalid')
        }
    })

    it('Should throw an error when configuration is invalid (fromConfig)', () => {
        try {
            moovMoneyApi = MoovMoneyAPi.fromConfig(wrongConfig)
            expect.fail('Should throw an error')
        } catch (error) {
            expect(error).toBeInstanceOf(BadConfigurationException)
            expect(error.message).toBe('Api configuration is invalid')
        }
    })

    
    const validConfig = {
        username: 'myusername', 
        password: 'mypassword',
    }

    it('Should create a new instance of the MoovMoney API (constructor)', () => {
        moovMoneyApi = new MoovMoneyAPi(new ApiConfig(validConfig))

        expect(moovMoneyApi).toBeInstanceOf(MoovMoneyAPi)
        expect(moovMoneyApi.soapClient).toBeInstanceOf(SoapClient)
    })

    it('Should create a new instance of the MoovMoney API (fromConfig)', () => {
        moovMoneyApi = MoovMoneyAPi.fromConfig(validConfig)

        expect(moovMoneyApi).toBeInstanceOf(MoovMoneyAPi)
        expect(moovMoneyApi.soapClient).toBeInstanceOf(SoapClient)
    })
})