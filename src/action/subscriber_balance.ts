import { StatusMessages } from "#common/interfaces/status_messages"
import { ActionContract } from "#contract/action_contract"
import { ApiResponse } from "#data/api_response"
import { BadConfigurationException } from "#exception/bad_configuration_exception"
import { ServerErrorException } from "#exception/server_error_exception"
import { SoapClient } from "#helper/soap_client"
import { XMLFormater } from "#helper/xml_formater"
import { BasicActionResponse } from "#type/basic_action_response"

export class SubscriberBalance implements ActionContract<SubscriberBalanceRequest, SubscriberBalanceResponse> {

    constructor(
        private _soapClient: SoapClient, 
        private _data?: SubscriberBalanceRequest, 
        private action = 'api:getBalance',
        private _apiDomain: string = 'xmlns:api="http://api.merchant.tlc.com/"',
        private _language: keyof StatusMessages = 'en'
    ) { }

    public static init(soapClient: SoapClient) {
        return new this(soapClient)
    }

    client(client: SoapClient): this {
        this._soapClient = client
        return this
    }

    language(language: keyof StatusMessages): this {
        if (language) this._language = language
        return this
    }

    data(data: SubscriberBalanceRequest): this {
        this._data = data;
        return  this
    }

    get requestXml(): string {
        const requestData : subscriberBalanceApiRequest = {
            token: this._data!.token,
            request: {
                msisdn: this._data?.msisdn ?? ''
            }
        }

        return XMLFormater.objectToSoapEnvelop(this.action, requestData, [this._apiDomain], 'soapenv')
    }

    public async execute(): Promise<ApiResponse<SubscriberBalanceResponse>> {
        if (!this._data) throw new BadConfigurationException('Data is not defined')
        if (!this._soapClient) throw new BadConfigurationException('Soap client is not defined')

        try {
            const response = await this._soapClient.post<subscriberBalanceResult>(this.requestXml)
            return new ApiResponse<SubscriberBalanceResponse>(response.return, this._language)
        } catch (error) {
            throw new ServerErrorException(error.message)
        }
    }
}

export type SubscriberBalanceRequest = {
    token: string
    msisdn: string
}

export type SubscriberBalanceResponse = Omit<BasicActionResponse, 'referenceid'> & {
    message: string,
    balance: string
}

type subscriberBalanceApiRequest =  {
    token: string,
    request: {
        msisdn: string
    }
}

type subscriberBalanceResult = {
    return: SubscriberBalanceResponse
}