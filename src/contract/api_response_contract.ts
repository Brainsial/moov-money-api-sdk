export abstract class ApiResponseContract<T> {
    abstract get(key: string): string
    abstract get data(): T
    abstract get description(): string
    abstract get message(): string
}