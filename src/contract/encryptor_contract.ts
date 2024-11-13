export abstract class EncryptorContract {
    abstract get token (): string
    abstract isKeyLengthValid (key: string): boolean
}