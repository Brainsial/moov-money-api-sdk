import { StatusMessages } from "#common/interfaces/status_messages"

export type APIConfigData = {
    /**
     * Your Moov Money API username.
     */
    username: string,
    
    /**
     * Your Moov Money API password.
     */
    password: string,

    /**
     * Your Moov Money API base URL.
     */
    baseUrl: string,

    /**
     * Your Moov Money API language.
     * Optional and defaults to 'en'.
     */
    language?: keyof StatusMessages,

    /**
     * Your Moov Money API encryption key.
     * Optional and defaults to 'tlc12345tlc12345tlc12345tlc12345'.
     */
    encryptionKey?: string,

    /**
     * Your Moov Money API request timeout in seconds.
     * Optional and defaults to 60.
     */
    requestTimeout?: number
}
