export interface User {
    displayName: string,
    email: string,
    emailVerified: boolean,
    isAnonymous: boolean,
    phoneNumber: string,
    photoURL: string,
    providerData: Array<any>,
    uid: string;
    _id: string;
    socket_id?:string;
    friends?: User[];
    requests?: User[];
}