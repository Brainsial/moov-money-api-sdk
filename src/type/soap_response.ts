export type SoapResponse<T> = {
    success: boolean
    data?: T
    error?: string
}