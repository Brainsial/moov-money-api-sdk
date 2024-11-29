import { describe, it, expect } from 'vitest'
import { XMLFormater } from '#helper/xml_formater'

describe('XML Fiormater tests', () => {
    it('Should convert an object to XML', () => {
        const obj = {
            name: 'John',
            age: 30,
            address: {
                street: '123 Main St',
                city: 'Anytown',
                state: 'CA',
                zip: '12345'
            }
        }

        const xml = XMLFormater.objectToXml(obj)

        expect(xml).toMatchInlineSnapshot(`"<name>John</name><age>30</age><address><street>123 Main St</street><city>Anytown</city><state>CA</state><zip>12345</zip></address>"`)
    })

    it('Should convert an XML string to an object', async () => {
        const xml = `
            <person>
                <name>John</name>
                <age>30</age>
                <address>
                    <street>123 Main St</street>
                    <city>Anytown</city>
                    <state>CA</state>
                    <zip>12345</zip>
                </address>
            </person>
        `

        const expected = {
            person: {
                name: 'John',
                age: '30',
                address: {
                    street: '123 Main St',
                    city: 'Anytown',
                    state: 'CA',
                    zip: '12345'
                }
            }
        }

        expect((await XMLFormater.xmlToObject(xml))).toStrictEqual(expected)
    })

    it('Should convert an object to a SOAP envelope', () => {
        const obj = {
            name: 'John',
            age: 30,
            address: {
                street: '123 Main St',
                city: 'Anytown',
                state: 'CA',
                zip: '12345'
            }
        }

        const xml = XMLFormater.objectToSoapEnvelop('action', obj)

        expect(xml).toMatchInlineSnapshot(`
          "<?xml version="1.0" encoding="utf-16"?>
                  <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope" >
                      <soap:Header/>
                      <soap:Body>
                          <action>
                              <name>John</name><age>30</age><address><street>123 Main St</street><city>Anytown</city><state>CA</state><zip>12345</zip></address>
                          </action>
                      </soap:Body>
                  </soap:Envelope>
                  "
        `)
    })
})