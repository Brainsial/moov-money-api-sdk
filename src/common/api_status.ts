import { StatusCode } from "#common/data/status_code";
import { STATUS_DESCRIPTION } from "#common/data/status_description";
import { STATUS_MESSAGES } from "#common/data/status_messages";
import { StatusMessages } from "#common/interfaces/status_messages";

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