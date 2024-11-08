export abstract class AppConfigContract {
    abstract get username(): string;
    abstract get password(): string;
    abstract get baseUrl(): string;
    abstract get encryptionKey(): string;
    abstract get requestTimeout(): number;
}