export interface IUser {
    id: number;
    login: string;
    firstName: string;
    lastName: string;
    email: string;
    activated: boolean;
    langKey: string;
    imageUrl: string;
    resetDate?: any;
}
