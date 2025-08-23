import type { PersonInfo } from "./personInfo";
import type { History } from "./packageHistory";
import type { Status } from "./status";

export type PackageDetails = {
    id: number;
    status: Status;
    sender: PersonInfo;
    recipient: PersonInfo;
    history: History[];
};