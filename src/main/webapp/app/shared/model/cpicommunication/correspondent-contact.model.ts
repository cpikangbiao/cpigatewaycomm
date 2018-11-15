export interface ICorrespondentContact {
    id?: number;
    correspondentContactName?: string;
    eMail?: string;
    telephoneOffice?: string;
    telephone?: string;
    webSite?: string;
    correspondentCorrespondentName?: string;
    correspondentId?: number;
}

export class CorrespondentContact implements ICorrespondentContact {
    constructor(
        public id?: number,
        public correspondentContactName?: string,
        public eMail?: string,
        public telephoneOffice?: string,
        public telephone?: string,
        public webSite?: string,
        public correspondentCorrespondentName?: string,
        public correspondentId?: number
    ) {}
}
