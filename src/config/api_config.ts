import { AppConfigContract } from "#contract/app_config_contract";
import { AddConfigData } from "#type/add_config_data";

export class ApiConfig implements AppConfigContract {

    constructor(private configData: AddConfigData) { }
    
    get username(): string {
        return this.configData.username
    }

    get password(): string {
        return this.configData.password
    }
    get baseUrl(): string {
        return this.configData.baseUrl
    }
    get encryptionKey(): string {
        return this.configData.encryptionKey || 'tlc12345tlc12345tlc12345tlc12345'
    }
    get requestTimeout(): number {
        return this.configData.requestTimeout || 60
    }
}