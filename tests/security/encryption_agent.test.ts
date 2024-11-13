import { describe, it, expect } from 'vitest'
import { EnryptionAgent } from '#security/encryption_agent'
import { InvalidArgumentException } from "#exception/invalid_argument_exception";

describe('EncryptionAgent tests', () => {
    it('Should trow InvalidArgumentException when encryption key length is not invalid', () => {
        expect(() => {
            new EnryptionAgent({
                username: 'username',
                password: 'password',
                encryptionKey: 'invalidKey'
            })
        }).toThrow(InvalidArgumentException)
    })

    it('Should return encrypted token', () => {
        const encryptionAgent = new EnryptionAgent({
            username: 'myusername',
            password: 'mypassword',
            encryptionKey: 'tlc12345tlc12345tlc12345tlc12345'
        })

        expect(encryptionAgent.token).toBe(`7a1FPyjZ4eqAhFIoHpLumttby9GoBPGuwV5AIaB22tc=`)
    })
})