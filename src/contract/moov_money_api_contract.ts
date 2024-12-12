import { AirtimeTranbsactionRequest, AirtimeTranbsactionResponse } from "#action/airtime_transaction";
import { CashInTranbsactionRequest, CashInTranbsactionResponse } from "#action/cash_in_transaction";
import { MovileStatusResponse } from "#action/mobile_status";
import { PushTransactionRequest, PushTransactionResponse } from "#action/push_transaction";
import { PushTransactionWithPendingResponse } from "#action/push_transaction_with_pending";
import { SubscriberBalanceResponse } from "#action/subscriber_balance";
import { transactionStatusResponse } from "#action/transaction_status";
import { TransferFloozRequest, TransferFloozResponse } from "#action/transfer_flooz";
import { ApiResponse } from "#data/api_response";
import { SoapClient } from "#helper/soap_client";

export abstract class MoovMoneyApiContract {
    abstract pushTransaction(data: Omit<PushTransactionRequest, 'token'>): Promise<ApiResponse<PushTransactionResponse>>
    abstract pushWithPendingTransaction(data: Omit<PushTransactionRequest, 'token'>): Promise<ApiResponse<PushTransactionWithPendingResponse>>
    abstract getTransactionStatus(transactionid: string): Promise<ApiResponse<transactionStatusResponse>>
    abstract transferFlooz(data: Omit<TransferFloozRequest, 'token'>): Promise<ApiResponse<TransferFloozResponse>>
    abstract getBalance(msisdn: string): Promise<ApiResponse<SubscriberBalanceResponse>>
    abstract getMobileStatus(msisdn: string): Promise<ApiResponse<MovileStatusResponse>>
    abstract cashIn(data: Omit<CashInTranbsactionRequest, 'token'>): Promise<ApiResponse<CashInTranbsactionResponse>>
    abstract airtime(data: Omit<AirtimeTranbsactionRequest, 'token'>): Promise<ApiResponse<AirtimeTranbsactionResponse>>
    abstract get soapClient(): SoapClient
}
