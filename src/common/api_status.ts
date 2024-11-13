import { StatusCode } from "./data/status_code";
import { STATUS_DESCRIPTION } from "./data/status_description";
import { STATUS_MESSAGES } from "./data/status_messages";
import { StatusMessages } from "./interfaces/status_messages";

export class ApiStatus {

    constructor(
        private readonly language: keyof StatusMessages = 'en'
    ) { }

    public getDescription(code: StatusCode): string {
        return STATUS_DESCRIPTION[code][this.language];
    }
    
    public getLongDescription(code: StatusCode): string {
        return STATUS_MESSAGES[code][this.language];
    }
}