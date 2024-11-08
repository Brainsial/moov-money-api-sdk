import { StatusCode } from "#common/data/status_code";
import { StatusMessages } from "#common/interfaces/status_messages";

export type StatusMap = {
    [K in StatusCode]: StatusMessages;
};