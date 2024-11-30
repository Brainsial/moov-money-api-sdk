import { StatusMessages } from "#common/interfaces/status_messages"
import { ActionContract } from "#contract/action_contract"
import { ApiResponse } from "#data/api_response"
import { BadConfigurationException } from "#exception/bad_configuration_exception"
import { ServerErrorException } from "#exception/server_error_exception"
import { SoapClient } from "#helper/soap_client"
import { XMLFormater } from "#helper/xml_formater"
import { BasicActionResponse } from "#type/basic_action_response"

export class TransferFlooz implements ActionContract<TransferFloozRequest, transferFloozResponse> {

    constructor(
        private _soapClient: SoapClient, 
        private _data?: TransferFloozRequest, 
        private action = 'api:transferFlooz',
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

    data(data: TransferFloozRequest): this {
        this._data = data;
        return  this
    }

    get requestXml(): string {
        const requestData : transerFloozApiRequest = {
            token: this._data!.token,
            request: {
                destination: this._data?.destination ?? '',
                amount: this._data?.amount ?? 0,
                referenceid: this._data?.referenceid ?? '',
                walletid: this._data?.wallet ?? '0',
                extendeddata: this._data?.data ?? ''
            }
        }

        return XMLFormater.objectToSoapEnvelop(this.action, requestData, [this._apiDomain], 'soapenv')
    }

    public async execute(): Promise<ApiResponse<transferFloozResponse>> {
        if (!this._data) throw new BadConfigurationException('Data is not defined')
        if (!this._soapClient) throw new BadConfigurationException('Soap client is not defined')

        try {
            const response = await this._soapClient.post<transferFloozResult>(this.requestXml)
            return new ApiResponse<transferFloozResponse>(response.return, this._language)
        } catch (error) {
            throw new ServerErrorException(error.message)
        }
    }

}

export type TransferFloozRequest = {
    token: string
    destination: string
    amount: number
    referenceid: string
    wallet?: string
    data?: string
}

export type transferFloozResponse = BasicActionResponse & {
    transactionid: string
    message: string
    referenceid: string
    senderbalancebefore: number
    senderbalanceafter: number
}

type transerFloozApiRequest =  {
    token: string,
    request: {
        destination: string
        amount: number
        referenceid: string
        walletid: string
        extendeddata: string
    }
}

type transferFloozResult = {
    return: transferFloozResponse
}