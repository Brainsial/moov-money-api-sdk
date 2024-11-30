import { ApiStatus } from "#common/api_status";
import { StatusCode } from "#common/data/status_code";
import { StatusMessages } from "#common/interfaces/status_messages";
import { ApiResponseContract } from "#contract/api_response_contract";

export class ApiResponse<T extends {status: StatusCode}> implements ApiResponseContract<T> {
    private _apiStatus: ApiStatus

    constructor(private _data:  T, language: keyof StatusMessages = 'en') {
        this._apiStatus = new ApiStatus(language)
    }

    get(key: string): string {
        return key
    }

    get data(): T { return this._data }

    get description(): string {
        return this._apiStatus.getDescription(this.data.status)
    }

    get message(): string {
        return this._apiStatus.getLongDescription(this.data.status)
    } 
    
}