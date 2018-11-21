import { IPort } from '../port';
export interface ICountry {
    id?: number;
    countryName?: string;
    countryNameChinese?: string;
    countryNameAbbr?: string;
    dialCode?: string;
    ports?: IPort[];
    timeZone?: string;
}
export class Country implements IPort {
    constructor(
        public id?: number,
        public countryName?: string,
        public countryNameChinese?: string,
        public countryNameAbbr?: string,
        public dialCode?: string,
        public ports?: IPort[],
        public timeZone?: string
    ) {}
}
