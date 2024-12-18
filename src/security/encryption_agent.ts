import { createCipheriv } from 'node:crypto'

import { EncryptorContract } from "#contract/encryptor_contract";
import { InvalidArgumentException } from "#exception/invalid_argument_exception";
import { APIConfigData } from "#type/api_config_data";

export class EnryptionAgent implements EncryptorContract {
    private _token: string = '';

    constructor(private encryptionData: encryptionData) { 
        this.generateToken()
    }

    private generateToken () { 
        if(!this.isKeyLengthValid(this.encryptionData.encryptionKey)) throw new InvalidArgumentException(
            'Encryption key must be 16, 24 or 32 bytes long'
        )

        const plainText = `0:${this.encryptionData.username}:${this.encryptionData.password}`

        const plain = Buffer.from(plainText, 'utf-8')
        const key = Buffer.from(this.encryptionData.encryptionKey, 'utf-8')
        const cipher = createCipheriv('aes-256-cbc', key, Buffer.alloc(16, 0))

        const encrypted = Buffer.concat([cipher.update(plain), cipher.final()])

        this._token = encrypted.toString('base64')
    }

    get token(): string {
        return this._token
    }

    isKeyLengthValid(key: string): boolean {
        return [16, 24, 32].includes(key.length)
    }
}

type encryptionData = Required<Omit<APIConfigData, 'requestTimeout' | 'useSandbox' | 'language'>> 