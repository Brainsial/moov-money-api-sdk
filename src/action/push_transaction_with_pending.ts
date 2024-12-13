import { StatusMessages } from "#common/interfaces/status_messages";
import { ActionContract } from "#contract/action_contract";
import { ApiResponse } from "#data/api_response";
import { BadConfigurationException } from "#exception/bad_configuration_exception";
import { ServerErrorException } from "#exception/server_error_exception";
import { SoapClient } from "#helper/soap_client";
import { XMLFormater } from "#helper/xml_formater";
import { BasicActionResponse } from "#type/basic_action_response";
import { PushTransactionRequest, PushTransactionApiRequest } from "#action//push_transaction";

export class PushTracsactionWithPending implements ActionContract<PushTransactionRequest, PushTransactionWithPendingResponse> {
    
    constructor(
        private _soapClient: SoapClient, 
        private _data?: PushTransactionRequest, 
        private action = 'api:PushWithPending',
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

    data(data: PushTransactionRequest): this {
        this._data = data;
        return  this
    }

    get requestXml(): string {
        const requestData : PushTransactionApiRequest = {
            token: this._data!.token,
            msisdn: this._data!.msisdn,
            message: this._data!.message,
            amount: this._data!.amount,
            externaldata1: this._data!.data1 ?? '',
            externaldata2: this._data!.data2 ?? '',
            fee: this._data!.fee ?? 0,
        }

        return XMLFormater.objectToSoapEnvelop(this.action, requestData, [this._apiDomain], 'soapenv')
    }

    public async execute(): Promise<ApiResponse<PushTransactionWithPendingResponse>> {
        if (!this._data) throw new BadConfigurationException('Data is not defined')
        if (!this._soapClient) throw new BadConfigurationException('Soap client is not defined')
    
        const response = await this._soapClient.post<PushTracsactionWithPendingResult>(this.requestXml)

        if ( !response ) throw new ServerErrorException('Response is not defined')
        

        return new ApiResponse<PushTransactionWithPendingResponse>(response.result, this._language)
    }
    
}

export type PushTransactionWithPendingResponse = Omit<BasicActionResponse, 'referenceid'> & {
    description: string
    transid?: string,
    referenceid?: string
}

type PushTracsactionWithPendingResult = {
    result : PushTransactionWithPendingResponse
}