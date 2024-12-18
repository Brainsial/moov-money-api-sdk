import { AirtimeTranbsactionRequest, AirtimeTranbsactionResponse, AirtimeTransaction } from '#action/airtime_transaction';
import { CashInTranbsaction, CashInTranbsactionRequest, CashInTranbsactionResponse } from '#action/cash_in_transaction';
import { MobileStatus, MovileStatusResponse } from '#action/mobile_status';
import { PushTracsaction, PushTransactionRequest, PushTransactionResponse } from '#action/push_transaction';
import { PushTracsactionWithPending, PushTransactionWithPendingResponse } from '#action/push_transaction_with_pending';
import { SubscriberBalance, SubscriberBalanceResponse } from '#action/subscriber_balance';
import { TransactionStatus, transactionStatusResponse } from '#action/transaction_status';
import { TransferFlooz, TransferFloozRequest, TransferFloozResponse } from '#action/transfer_flooz';
import { ApiConfig } from "#config/api_config";
import { MoovMoneyApiContract } from "#contract/moov_money_api_contract";
import { ApiResponse } from "#data/api_response";
import { BadConfigurationException } from "#exception/bad_configuration_exception";
import { SoapClient } from "#helper/soap_client";
import { EnryptionAgent } from "#security/encryption_agent";
import { APIConfigData } from '#type/api_config_data';

export class MoovMoneyAPi implements MoovMoneyApiContract {

    private _soapClient: SoapClient
    private _encryptionAgent: EnryptionAgent

    /**
     * Construct a new instance of the MoovMoney API
     * 
     * @param {ApiConfig} config the configuration for the MoovMoney API
     * @throws {BadConfigurationException} if the configuration is invalid
     */
    constructor(private readonly config: ApiConfig) {
        if (!this.config.isValid) throw new BadConfigurationException('Api configuration is invalid')

        this._soapClient = new SoapClient(this.config)
        this._encryptionAgent = new EnryptionAgent(this.config)
    }

    /**
     * Returns the SOAP client used by the MoovMoney API SDK
     * 
     * @returns {SoapClient} the SOAP client used by the MoovMoney API
     */
    get soapClient(): SoapClient { return this._soapClient }

    /**
     * Creates a new instance of the MoovMoney API from a given configuration
     * 
     * @param {APIConfigData} config the configuration for the MoovMoney API
     * @param {string} config.username The username for the Moov Money API
     * @param {string} config.password The password for the Moov Money API
     * @param {string} config.language The language for the Moov Money API (default: 'en') 
     * @param {number} config.requestTimeout The request timeout (seconds) for the Moov Money API (default: 60)
     * @returns {MoovMoneyAPi} a new instance of the MoovMoney API
     */
    static fromConfig(config: APIConfigData): MoovMoneyAPi {
        return new MoovMoneyAPi(new ApiConfig(config))
    }

    /**
     * Sends a push transaction request to Moov Money API.
     * 
     * @param {Omit<PushTransactionRequest, "token">} data the data for the push transaction
     * @param {string} data.msisdn Mobile Number
     * @param {string} data.message Push Message Notification
     * @param {number} data.amount Amount of transaction
     * @param {string} data.data1 Merchant Remarks 1 (optional)
     * @param {string} data.data2 Merchant Remarks 2 (optional)
     * @param {number} data.fee Merchant Fee (optional)
     * @returns {Promise<ApiResponse<PushTransactionResponse>>} the result of the push transaction
     */
    pushTransaction(data: Omit<PushTransactionRequest, "token">): Promise<ApiResponse<PushTransactionResponse>> {
        return PushTracsaction.init(this._soapClient)
            .language(this.config.language)
            .client(this._soapClient).data({...data, token : this._encryptionAgent.token})
        .execute()
    }

    /**
     * Sends a push transaction with pending status to Moov Money API.
     * 
     * @param {Omit<PushTransactionRequest, "token">} data the data for the push transaction
     * @param {string} data.msisdn Mobile Number
     * @param {string} data.message Push Message Notification
     * @param {number} data.amount Amount of transaction
     * @param {string} data.data1 Merchant Remarks 1 (optional)
     * @param {string} data.data2 Merchant Remarks 2 (optional)
     * @param {number} data.fee Merchant Fee (optional)
     * @returns {Promise<ApiResponse<PushTransactionWithPendingResponse>>} the result of the push transaction
     */
    pushWithPendingTransaction(data: Omit<PushTransactionRequest, 'token'>): Promise<ApiResponse<PushTransactionWithPendingResponse>> {
        return PushTracsactionWithPending.init(this._soapClient)
            .language(this.config.language)
            .client(this._soapClient).data({...data, token : this._encryptionAgent.token})
        .execute()
    }

    /**
     * Checks the status of a transaction using its reference ID.
     * 
     * @param {string} id Transaction ID
     * @returns {Promise<ApiResponse<transactionStatusResponse>>} the result of the transaction status retrieval
     */
    getTransactionStatus(id: string): Promise<ApiResponse<transactionStatusResponse>> {
        return TransactionStatus.init(this._soapClient)
            .language(this.config.language)
            .client(this._soapClient).data({ transactionid: id, token : this._encryptionAgent.token})
        .execute()
    }

    /**
     * Merchant transfer a funds to an account which allowed by the configurations.
     * 
     * @param {Omit<TransferFloozRequest, "token">} data the data for the transfer
     * @param {string} data.destination Destination msisdn
     * @param {number} data.amount Amount of transaction
     * @param {string} data.referenceid Transaction id of Mechant
     * @param {string} data.data Remarks (optional)
     * @param {string} data.wallet Wallet ID (Default 0) (optional)
     * @returns {Promise<ApiResponse<TransferFloozResponse>>} the result of the transfer
     */
    transferFlooz(data: Omit<TransferFloozRequest, 'token'>): Promise<ApiResponse<TransferFloozResponse>> {
        return TransferFlooz.init(this._soapClient)
            .language(this.config.language)
            .client(this._soapClient).data({...data, token : this._encryptionAgent.token})
        .execute()
    }

    /**
     * To check the current balance of subscribers, default of main wallet (walletID 0).
     * 
     * @param {string} phone Subscriber phone number
     * @returns {Promise<ApiResponse<SubscriberBalanceResponse>>} the result of the balance retrieval
     */
    getBalance(phone: string): Promise<ApiResponse<SubscriberBalanceResponse>> {
        return SubscriberBalance.init(this._soapClient)
            .language(this.config.language)
            .client(this._soapClient).data({ msisdn: phone, token : this._encryptionAgent.token})
        .execute()
    }

    /**
     * To check the status of subscriber and KYC informations
     * 
     * @param {string} phone Subscriber number
     * @returns {Promise<ApiResponse<MovileStatusResponse>>} the result of the status retrieval
     */
    getMobileStatus(phone: string): Promise<ApiResponse<MovileStatusResponse>> {
        return MobileStatus.init(this._soapClient)
            .language(this.config.language)
            .client(this._soapClient).data({ msisdn: phone, token : this._encryptionAgent.token})
        .execute()
    }

    /**
     * To do a CASHIN transaction for subscribers
     * 
     * @param {Omit<CashInTranbsactionRequest, "token">} data the data for the cash-in transaction
     * @param {string} data.destination Subscriber destination number
     * @param {number} data.amount Amount of transaction
     * @param {string} data.referenceid Reference id of Mechant
     * @param {string} data.data Remarks
     * @returns {Promise<ApiResponse<CashInTranbsactionResponse>>} the result of the cash-in transaction
     */
    cashIn(data: Omit<CashInTranbsactionRequest, 'token'>): Promise<ApiResponse<CashInTranbsactionResponse>> {
        return CashInTranbsaction.init(this._soapClient)
            .language(this.config.language)
            .client(this._soapClient).data({...data, token : this._encryptionAgent.token})
        .execute()
    }


    /**
     * To do an Airtime transaction for subscribers
     * 
     * @param {Omit<AirtimeTranbsactionRequest, "token">} data the data for the airtime transaction
     * @param {string} data.destination Subscriber destination number
     * @param {number} data.amount Amount of transaction
     * @param {string} data.referenceid Reference id of Mechant
     * @param {string} data.data Remarks
     * @returns {Promise<ApiResponse<AirtimeTranbsactionResponse>>} the result of the airtime transaction
     */
    airtime(data: Omit<AirtimeTranbsactionRequest, 'token'>): Promise<ApiResponse<AirtimeTranbsactionResponse>> {
        return AirtimeTransaction.init(this._soapClient)
            .language(this.config.language)
            .client(this._soapClient).data({...data, token : this._encryptionAgent.token})
        .execute()
    }
    
} 