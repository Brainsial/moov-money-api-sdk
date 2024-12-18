import { StatusMessages } from "#common/interfaces/status_messages";
import { AppConfigContract } from "#contract/app_config_contract";
import { APIConfigData } from "#type/api_config_data";

export class ApiConfig implements AppConfigContract {

    private static url = {
        sandboxUrl: 'https://testapimarchand2.moov-africa.bj:2010/com.tlc.merchant.api/UssdPush?wsdl',
        productionUrl: 'https://apimarchand.moov-africa.bj/com.tlc.merchant.api/UssdPush?wsdl'
    }

    private _baseUrl: string | null = null;

    private config : ApiConfigDataUsable

    constructor(configData: APIConfigData) { 
        this.config = {
            username: configData.username,
            password: configData.password,
            useSandbox: configData.useSandbox || true,
            language: configData.language ?? 'en',
            encryptionKey: configData.encryptionKey || 'tlc12345tlc12345tlc12345tlc12345',
            requestTimeout: configData.requestTimeout || 60
        }
    }
    get isSandbox(): boolean {
        return this.config.useSandbox
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

    get language(): keyof StatusMessages {
        return this.config.language
    }

    set language(language: keyof StatusMessages) {
        this.config.language = language
    }

    get baseUrl(): string {
        return this._baseUrl ?? this.config.useSandbox ? ApiConfig.url.sandboxUrl : ApiConfig.url.productionUrl
    }

    set baseUrl(baseUrl: string) {
        this._baseUrl = baseUrl
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

    set useSandbox(useSandbox: boolean) {
        if(this.config.useSandbox != useSandbox) this.config.useSandbox = useSandbox
    }

    get isValid(): boolean {
        return this.config.username.length > 0 && this.config.password.length > 0 && this.config.username != 'username' && this.config.password != 'password'
    }

}

type ApiConfigDataUsable = Required<APIConfigData>