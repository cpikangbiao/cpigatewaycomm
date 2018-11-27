export class Correspondent {
    constructor(
        public id?: number,
        public correspondentName?: string,
        public faxNumber?: string,
        public address?: string,
        public telephoneOffice?: string,
        public telephoneAlternate?: string,
        public webSite?: string,
        public contacts?: any,
        public portPortName?: string,
        public portId?: number,
        public email?: string
    ) {}
}
