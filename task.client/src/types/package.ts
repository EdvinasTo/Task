import type { Status } from "./status";

export type Package = {
    id: number;
    status: Status;
    sender: string;
    recipient: string;
    createdAt: string;
};