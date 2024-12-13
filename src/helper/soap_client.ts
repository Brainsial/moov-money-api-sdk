import { ServerErrorException } from "#exception/server_error_exception";
import { SoapConfig } from "#type/soap_config";
import { XMLFormater } from "#helper/xml_formater";

export class SoapClient {
    private _config: SoapConfig;

    constructor(config: SoapConfig) {
        this._config = {
            timeout: 60000,
            headers: {
                // 'Content-Type': 'text/xml; charset=utf-8',
                'Content-Type': 'application/soap+xml; charset=utf-8',
                'accept': 'text/xml'
            },
            ...config
        }
    }

    async get<T>(params?: any): Promise<T> {
        const url = new URL(this._config.baseUrl)

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.set(key, String(value))
            })
        }

        return this.request<T>('GET', url.href)
    }

    async post<T>(body: string): Promise<T>{
        return this.request<T>('POST', this._config.baseUrl, body)    
    }

    async put<T>(body: string): Promise<T> {
        return this.request<T>('PUT', this._config.baseUrl, body)    
    }

    async delete<T>(params?: any): Promise<T> {
        const url = new URL(this._config.baseUrl)

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.set(key, String(value))
            })
        }

        return this.request<T>('DELETE', url.href)
    }


    private async request<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, body?: string): Promise<T> {
        
        try {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), this._config.timeout)
    
            const response = await fetch(url, {
                body,
                method,
                headers: this._config.headers,
                signal: controller.signal
            })
    
            clearTimeout(timeoutId)
    
            if (!response.ok) throw new ServerErrorException(`[${response.status}] ${response.statusText}`)
    
            let xml = await response.text()
            
            xml = xml.trim().match(/<(return|response|result)>[\s\S]*?<\/\1>/)?.at(0) ?? xml.trim()

            const data = await XMLFormater.xmlToObject(xml)
    
            return data as T
        } catch (error) {
            throw new ServerErrorException(error instanceof Error ? error.message : String(error))
        }
        
    }
}