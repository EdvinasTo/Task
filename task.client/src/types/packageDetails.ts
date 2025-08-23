import type { PersonInfo } from "./personInfo";
import type { History } from "./packageHistory";

export type PackageDetails = {
    senderInfo: PersonInfo;
    recipientInfo: PersonInfo;
    packageHistory: History[];
};