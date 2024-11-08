import { StatusCode } from "./data/status_code";
import { STATUS_MESSAGES } from "./data/status_messages";
import { StatusMessages } from "./interfaces/status_messages";

export default class ApiStatus {

    constructor(
        private readonly language: keyof StatusMessages = 'fr'
    ) { }

    public getLongDescription(code: StatusCode): string {
        return STATUS_MESSAGES[code][this.language];
    }
}