import { StatusMessages } from "#common/interfaces/status_messages"
import { ActionContract } from "#contract/action_contract"
import { ApiResponse } from "#data/api_response"
import { BadConfigurationException } from "#exception/bad_configuration_exception"
import { ServerErrorException } from "#exception/server_error_exception"
import { SoapClient } from "#helper/soap_client"
import { XMLFormater } from "#helper/xml_formater"
import { BasicActionResponse } from "#type/basic_action_response"

export class AirtimeTransaction implements ActionContract<AirtimeTranbsactionRequest, AirtimeTranbsactionResponse> {

    constructor(
        private _soapClient: SoapClient, 
        private _data?: AirtimeTranbsactionRequest, 
        private action = 'api:airtimetrans',
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

    data(data: AirtimeTranbsactionRequest): this {
        this._data = data;
        return  this
    }

    get requestXml(): string {
        const requestData : AirtimeTransactionApiRequest = {
            token: this._data!.token,
            request: {
                destination: this._data?.destination ?? '',
                amount: this._data?.amount ?? 0,
                referenceid: this._data?.referenceid ?? '',
                remarks: this._data?.remarks ?? ''
            }
        }

        return XMLFormater.objectToSoapEnvelop(this.action, requestData, [this._apiDomain], 'soapenv')
    }

    public async execute(): Promise<ApiResponse<AirtimeTranbsactionResponse>> {
        if (!this._data) throw new BadConfigurationException('Data is not defined')
        if (!this._soapClient) throw new BadConfigurationException('Soap client is not defined')
        
        const response = await this._soapClient.post<AirtimeTransactionResult>(this.requestXml)

        if ( !response ) throw new ServerErrorException('Response is not defined')

        return new ApiResponse<AirtimeTranbsactionResponse>(response.return, this._language)
    }
}

export type AirtimeTranbsactionRequest = {
    token: string
    destination: string
    amount: number
    referenceid: string
    remarks: string
}

export type AirtimeTranbsactionResponse = BasicActionResponse & {
    message: string
    transid: string
}

type AirtimeTransactionApiRequest =  {
    token: string
    request: {
        destination: string
        amount: number
        referenceid: string
        remarks: string
    }
}

type AirtimeTransactionResult = {
    return : AirtimeTranbsactionResponse
}