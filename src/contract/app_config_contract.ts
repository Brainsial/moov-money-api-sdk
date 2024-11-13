export abstract class AppConfigContract {
    abstract get username(): string
    abstract get password(): string
    abstract get baseUrl(): string
    abstract get encryptionKey(): string
    abstract get requestTimeout(): number
    abstract get isValid(): boolean

    abstract set username(username: string)
    abstract set password(password: string)
    abstract set baseUrl(baseUrl: string)
    abstract set encryptionKey(encryptionKey: string)
    abstract set requestTimeout(requestTimeout: number)
}