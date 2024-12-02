import { DefaultServer } from "./default.server";

export class MoovMoneyTestServer extends DefaultServer {
    protected _port: number = 3355

    public start(): this {
        super.start()

        this._server.on('request', (req, res) => {
            const { method } = req

            res.setHeader("Content-Type", "text/xml; charset=utf-8")
            res.setHeader("accept", "text/xml")

            if (method != 'POST') {
                res.write('Method not allowed')
                res.statusCode = 400
                res.end()
                return this
            }

            let data : any[]  = []
            let body : string = ''

            req.on('data', chunk => {
                data.push(chunk)
            }).on('end',  () => {
                body = Buffer.concat(data).toString()

                body = body.trim().match(/<(api:\s*\w+)>[\s\S]*?<\/\1>/)?.at(0) ?? body.trim()
                res.statusCode = 200
                res.write(this.process(body))
                res.end()
            })
        })

        return this
    }

    private process(body: string): string {
        if (body.includes('api:PushWithPending')) {
            return this.pushTransactionWithPendingResponse(body.includes('<msisdn>22995155936</msisdn>'))
        } else if (body.includes('api:Push')) {
            return this.pushTransactionResponse()
        } else if (body.includes('api:getTransactionStatus')) {
            return this.transactionStatusResponse()
        } else if (body.includes('api:transferFlooz')) {
            return this.transferFloozResponse()
        } else if (body.includes('api:getBalance')) {
            return this.subscriberBalanceResponse()
        } else if (body.includes('api:getMobileAccountStatus')) {
            return this.mobileStatusResponse()
        } else if (body.includes('api:cashintrans')) {
            return this.cashInTranbsactionResponse()
        } else if (body.includes('api:airtimetrans')) {
            return this.airtimeTranbsactionResponse()
        }

        return ''
    }

    private pushTransactionResponse() {
        return this.responseBody(
            'transferFloozResponse', 
            `<return>
                <status>0</status>
                <message>SUCCESS</message>
                <referenceid>0009993544647</referenceid>
            </return>`
        )
    }

    private transactionStatusResponse() {
        return this.responseBody(
            'getTransactionStatusResponse', 
            `<response>
                <description>SUCCESS</description>
                <referenceid>020190503000000</referenceid>
                <status>0</status>
            </response>`
        )
    }

    private transferFloozResponse() {
        return this.responseBody(
            'transferFloozResponse', 
            `<return>
                <transactionid>1234567890</transactionid>
                <status>0</status>
                <message>Vous avez envoye 10.00 FCFA a 22994512412. Votre nouveau solde Flooz est de 16809.00 FCFA. Ref :920190616000000.</message>
                <referenceid>920190616000000</referenceid>
                <senderkeycost/>
                <senderbonus/>
                <senderbalancebefore>16819.00</senderbalancebefore>
                <senderbalanceafter>16809.00</senderbalanceafter>
            </return>`
        )
    }

    private subscriberBalanceResponse() {
        return this.responseBody(
            'getBalanceResponse', 
            `<return>
                <balance>382222</balance>
                <message>SUCCESS</message>
                <status>0</status>
            </return>`
        )
    }

    private mobileStatusResponse() {
        return this.responseBody(
            'getMobileAccountStatusResponse', 
            `<return>
                <accounttype>MCOM</accounttype>
                <allowedtransfer>0</allowedtransfer>
                <city>COTONOU</city>
                <dateofbirth>1987-11-01 00:00:00.0</dateofbirth>
                <firstname>REUGIE</firstname>
                <lastname>ARIZALA</lastname>
                <message>SUCCESS</message>
                <msisdn>22994512412</msisdn>
                <region>ATLANTIQUE</region>
                <secondname></secondname>
                <status>0</status>
                <street>ST JEAN I (MINFFONGOU)</street>
                <subscriberstatus>ACTIVE</subscriberstatus>
            </return>`
        )
    }

    private cashInTranbsactionResponse() {
        return this.responseBody(
            'cashintransResponse', 
            `<return>
                <message>Vous avez envoye 500.00 FCFA a ARIZALA REUGIE 22994512412.Commission recue Hors Taxe. Votre nouveau solde Moov Money est de 96700.00 FCFA. Ref :020190628000017.</message>
                <referenceid>1000000000000</referenceid>
                <status>0</status>
                <transid>020190628000017</transid>
            </return>`
        )
    }

    private airtimeTranbsactionResponse() {
        return this.responseBody(
            'cashintransResponse', 
            `<return>
                <message>Vous avez recharge de 200.00 FCFA le 22994512412. Votre commission est de 8.00F Votre nouveau solde Flooz est de 95200.00 FCFA. Cout de la transaction 0 FCFA. Ref :020190628000024.</message>
                <referenceid>120000000</referenceid>
                <status>0</status>
                <transid>020190628000024</transid>
            </return>`
        )
    }

    private pushTransactionWithPendingResponse(pending: boolean) {
        console.log({pending});
        
        return this.responseBody(
            'PushWithPendingResponse', 
            pending ? `<result>
                <description>IN PENDING STATE</description>
                <status>100</status>
            </result>`
            : `<result>
                <description>SUCCESS</description>
                <referenceid>720220120000006</referenceid>
                <status>0</status>
                <transid>pi_NyM_1642619082990</transid>
            </result>`
        )
    }

    private responseBody(action: string, body: string) {
        return `<?xml version="1.0" encoding="utf-16"?>
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <ns2:${action} xmlns:ns2="http://tlc.com.ph/">
                    ${body}
                </ns2:${action}>
            </soap:Body>
        </soap:Envelope>`
    }

}