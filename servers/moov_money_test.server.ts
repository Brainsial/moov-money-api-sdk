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
        if (body.includes('api:Push')) {
            return this.pushTransactionResponse()
        } else if (body.includes('api:getTransactionStatus>')) {
            return this.transactionStatusResponse()
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