import { StatusMessages } from "#common/interfaces/status_messages";
import { ApiResponse } from "#data/api_response";
import { SoapClient } from "#helper/soap_client";
import { BasicActionResponse } from "#type/basic_action_response";

export abstract class ActionContract<D, R extends BasicActionResponse> {
    abstract data(data: D): this

    abstract get requestXml(): string

    abstract client(client: SoapClient): this

    abstract language(language: keyof StatusMessages): this

    abstract execute(): Promise<ApiResponse<R>>
}
