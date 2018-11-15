export interface ICountry {
    id?: number;
    countryName?: string;
    countryNameAbbr?: string;
    countryNameChinese?: string;
    dialCode?: string;
}

export class Country implements ICountry {
    constructor(
        public id?: number,
        public countryName?: string,
        public countryNameAbbr?: string,
        public countryNameChinese?: string,
        public dialCode?: string
    ) {}
}
