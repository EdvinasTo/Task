import type { Status } from "./status";

export type Package = {
    id: number;
    status: Status;
    senderName: string;
    recipientName: string;
    dateTime: string;
};