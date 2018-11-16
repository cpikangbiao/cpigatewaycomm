export interface IPort {
    id?: number;
    portCode?: string;
    portName?: string;
    portNameChinese?: string;
    countryCountryName?: string;
    countryId?: number;
}

export class Port implements IPort {
    constructor(
        public id?: number,
        public portCode?: string,
        public portName?: string,
        public portNameChinese?: string,
        public countryCountryName?: string,
        public countryId?: number
    ) {}
}
