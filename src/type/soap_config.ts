export type SoapConfig = {
    /**
     * The base URL of the SOAP service
     */
    baseUrl: string,

    /**
     * Additional headers to include in the request
     */
    headers?: Record<string, string>,
    
    /**
     * The timeout in seconds for the request
     */
    timeout?: number
}