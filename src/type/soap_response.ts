export type SoapResponse<T> = {
    /**
     * Indicates if the request was successful
     */
    success: boolean

    /**
     * Contains the data returned from the request if successful
     */
    data?: T

    /**
     * Contains the error message if the request was not successful
     */
    error?: string
}
