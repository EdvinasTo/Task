import type { PersonInfo } from "./personInfo";

export type CreatePackageRequest = {
    senderInfo: PersonInfo;
    recipientInfo: PersonInfo;
};