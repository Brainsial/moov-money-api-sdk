import { AppConfigContract } from "#contract/app_config_contract";
import { APIConfigData } from "#type/api_config_data";

export class ApiConfig implements AppConfigContract {

    private config : ApiConfigDataUsable

    constructor(configData: APIConfigData) { 
        this.config = {
            username: configData.username,
            password: configData.password,
            baseUrl: configData.baseUrl,
            encryptionKey: configData.encryptionKey || 'tlc12345tlc12345tlc12345tlc12345',
            requestTimeout: configData.requestTimeout || 60
        }
    }
    
    get username(): string {
        return this.config.username
    }

    set username(username: string) {
        this.config.username = username
    }

    get password(): string {
        return this.config.password
    }

    set password(password: string) {
        this.config.password = password
    }

    get baseUrl(): string {
        return this.config.baseUrl
    }

    set baseUrl(baseUrl: string) {
        this.config.baseUrl = baseUrl
    }

    get encryptionKey(): string {
        return this.config.encryptionKey
    }

    set encryptionKey(encryptionKey: string) {
        this.config.encryptionKey = encryptionKey
    }

    get requestTimeout(): number {
        return this.config.requestTimeout
    }

    set requestTimeout(requestTimeout: number) {
        this.config.requestTimeout = requestTimeout
    }

    get isValid(): boolean {
        return this.config.username.length > 0 && this.config.password.length > 0 && this.config.baseUrl.length > 0
    }

}

type ApiConfigDataUsable = Required<APIConfigData>