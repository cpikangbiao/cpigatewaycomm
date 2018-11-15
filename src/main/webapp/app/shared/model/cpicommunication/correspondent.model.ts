export interface ICorrespondent {
    id?: number;
    correspondentName?: string;
    faxNumber?: string;
    address?: string;
    telephoneOffice?: string;
    telephoneAlternate?: string;
    webSite?: string;
    portPortName?: string;
    portId?: number;
}

export class Correspondent implements ICorrespondent {
    constructor(
        public id?: number,
        public correspondentName?: string,
        public faxNumber?: string,
        public address?: string,
        public telephoneOffice?: string,
        public telephoneAlternate?: string,
        public webSite?: string,
        public portPortName?: string,
        public portId?: number
    ) {}
}
