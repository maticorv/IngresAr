export interface IUser {
    id: number;
    login: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
    activated: boolean;
    langKey: string;
    createdBy: string;
    createdDate?: any;
    lastModifiedBy: string;
    lastModifiedDate?: any;
    authorities: string[];
}
