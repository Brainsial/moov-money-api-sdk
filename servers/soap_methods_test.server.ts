import { DefaultServer } from "./default.server";
import { XMLFormater } from "#helper/xml_formater";

export class SoapMethodsTestServer extends DefaultServer {

    public start(): this {
        super.start()

        this._server.on('request', (req, res) => {
            const { method, url, headers } = req

            res.setHeader("Content-Type", "text/xml; charset=utf-8")
            res.setHeader("accept", "text/xml")
            res.statusCode = 200

            if (method == 'POST' || method == 'PUT') {
                let data : any[]  = []
                let body : string = ''
    
                req.on('data', chunk => {
                    data.push(chunk)
                }).on('end', () => {
                    body = Buffer.concat(data).toString()

                    res.write(this.response({
                        method: method || 'NONE',
                        message: body.length ? 'Body received' : 'Body empty' 
                    }))
                    
                    res.end()
                })

                return this
            }

            res.write(this.response({
                method: method || 'NONE',
                message: 'call received'
            }))

            res.end()
        })

        return this
    }

    private response(data: Response): string {
        return `<?xml version="1.0" encoding="utf-16"?>
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <ns2:transferFloozResponse xmlns:ns2="http://tlc.com.ph/">
                <return>
                    ${XMLFormater.objectToXml(data)}
                </return>
                </ns2:transferAccountResponse>
            </soap:Body>
        </soap:Envelope>
        `
    }
}

type Response = {
    method: string
    message: any
}