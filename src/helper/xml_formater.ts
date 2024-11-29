import { parseStringPromise } from 'xml2js'


export class XMLFormater {

    /**
     * Converts an object to its SOAP envelope representation.
     * @param action The SOAP action of the request
     * @param body The object to convert to XML
     * @param envXtras Additional attributes to add to the Envelope tag
     * @param soapKey The namespace prefix to use for the SOAP tags. Defaults to 'soap'.
     * @returns The XML string representing the SOAP envelope.
     */
    static objectToSoapEnvelop(action: string, body: any, envXtras: string[] = [], soapKey = 'soap'): string {
        return `<?xml version="1.0" encoding="utf-16"?>
        <${soapKey}:Envelope xmlns:${soapKey}="http://schemas.xmlsoap.org/soap/envelope" ${envXtras.join(' ')}>
            <${soapKey}:Header/>
            <${soapKey}:Body>
                <${action}>
                    ${this.objectToXml(body)}
                </${action}>
            </${soapKey}:Body>
        </${soapKey}:Envelope>
        `
    }
    
    /**
     * This function takes an object and returns its XML representation.
     * If the value is a primitive type, it is converted to a string.
     * If the value is an array, each element is converted recursively and the results are concatenated.
     * If the value is an object, the object is converted recursively and the results are concatenated.
     * @param obj The object to convert to XML
     * @returns The XML representation of the object
     */
    static objectToXml(obj: any): string {
        if (typeof obj !== 'object' || obj === null) return String(obj)

        return Object.entries(obj)
            .map(([key, value]) => {
                if (Array.isArray(value)) {
                    return value.map(item => `<${key}>${this.objectToXml(item)}</${key}>`).join('')
                }

                return `<${key}>${this.objectToXml(value)}</${key}>`
            })
        .join('')
    }


    /**
     * This function takes an XML string and returns its JavaScript representation.
     * The XML must be in the format of a single root node with children.
     * The function will return a JavaScript object with the same structure as the XML.
     * Attributes will be merged with the node's children.
     * Arrays will only be created if there are multiple children with the same name.
     * Strings will be trimmed of whitespace.
     * @param xml The XML string to convert to a JavaScript object
     * @param options Options to pass to the xml2js parser
     * @returns The JavaScript object representation of the XML
     */
    static async xmlToObject(xml: string, options: ParseOptions = {}): Promise<any> {

        const defaultOptions: ParseOptions = {
            explicitArray: false,    // Not to create arrays for single elements
            ignoreAttrs: false,      // Ignore attributes
            mergeAttrs: true,        // Merge attributes
            trim: true,              // Trim strings
            ...options
        };

        return parseStringPromise(xml, defaultOptions)
    }
    
}

interface ParseOptions {
    explicitArray?: boolean;
    ignoreAttrs?: boolean;
    mergeAttrs?: boolean;
    trim?: boolean;
}
