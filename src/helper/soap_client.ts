import { SoapConfig } from "#type/soap_config";
import { SoapResponse } from "#type/soap_response";
import { XMLFormater } from "./xml_formater";

export class SoapClient {
    private _config: SoapConfig;

    constructor(config: SoapConfig) {
        this._config = {
            timeout: 60000,
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
                'accept': 'text/xml'
            },
            ...config
        }
    }

    async get<T>(action: string, params?: any): Promise<SoapResponse<T>> {
        console.log(action);
        
        const url = new URL(this._config.baseUrl)

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.set(key, String(value))
            })
        }

        return this.request<T>('GET', url.href)
    }

    async post<T>(action: string, body: any): Promise<SoapResponse<T>> {
        const soapEnvelop = XMLFormater.objectToSoapEnvelop(action, body)
        return this.request<T>('POST', this._config.baseUrl, soapEnvelop)    
    }

    async put<T>(action: string, body: any): Promise<SoapResponse<T>> {
        const soapEnvelop = XMLFormater.objectToSoapEnvelop(action, body)
        return this.request<T>('PUT', this._config.baseUrl, soapEnvelop)    
    }

    async delete<T>(action: string, params?: any): Promise<SoapResponse<T>> {
        console.log(action);
        
        const url = new URL(this._config.baseUrl)

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.set(key, String(value))
            })
        }

        return this.request<T>('DELETE', url.href)
    }


    private async request<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, body?: string): Promise<SoapResponse<T>> {
        

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
    
            if (!response.ok) throw new Error(`[${response.status}] ${response.statusText}`)
    
            let xml = await response.text()
            
            xml = xml.trim().match(/<(return|response|result)>[\s\S]*?<\/\1>/)?.at(0) ?? xml.trim()

            const data = await XMLFormater.xmlToObject(xml)
    
            return {
                success: true,
                data: data as T
            }
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Something went wrong'
            }
        }
        
    }
}