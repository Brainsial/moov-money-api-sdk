import { StatusMessages } from "#common/interfaces/status_messages"
import { ActionContract } from "#contract/action_contract"
import { ApiResponse } from "#data/api_response"
import { BadConfigurationException } from "#exception/bad_configuration_exception"
import { ServerErrorException } from "#exception/server_error_exception"
import { SoapClient } from "#helper/soap_client"
import { XMLFormater } from "#helper/xml_formater"
import { BasicActionResponse } from "#type/basic_action_response"

export class MobileStatus implements ActionContract<MobileStatusRequest, MovileStatusResponse> {

    constructor(
        private _soapClient: SoapClient, 
        private _data?: MobileStatusRequest, 
        private action = 'api:getMobileAccountStatus',
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

    data(data: MobileStatusRequest): this {
        this._data = data;
        return  this
    }

    get requestXml(): string {
        const requestData : MobileStatusApiRequest = {
            token: this._data!.token,
            request: {
                msisdn: this._data?.msisdn ?? ''
            }
        }

        return XMLFormater.objectToSoapEnvelop(this.action, requestData, [this._apiDomain], 'soapenv')
    }

    public async execute(): Promise<ApiResponse<MovileStatusResponse>> {
        if (!this._data) throw new BadConfigurationException('Data is not defined')
        if (!this._soapClient) throw new BadConfigurationException('Soap client is not defined')
        
        const response = await this._soapClient.post<MobileStatusResult>(this.requestXml)

        if ( !response ) throw new ServerErrorException('Response is not defined')

        return new ApiResponse<MovileStatusResponse>(response.return, this._language)
    }
}

export type MobileStatusRequest = {
    token: string
    msisdn: string
}

export type MovileStatusResponse = Omit<BasicActionResponse, 'referenceid'> & {
    message: string,
    accounttype: string
    firstname: string
    lastname: string
    secondname: string
    dateofbirth: string
    region: string
    city: string
    street: string
    subcriberstatus: string
    allowedtransfer: string
}

type MobileStatusApiRequest =  {
    token: string,
    request: {
        msisdn: string
    }
}

type MobileStatusResult = {
    return : MovileStatusResponse
}