import { Period } from "../enums/period";

export class License {
    public id?: number;
    public organization: string;
    public serialNumber: string;
    public issueDate: string;
    public validity: number;
    public period: Period;
    public digitalSignature: string;
}