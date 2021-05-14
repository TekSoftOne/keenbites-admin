const tokenID = 'KB_ADMIN_AUTH0_TOKEN';
const api = process.env.api;
interface ClientDataId {
    id: number;
    auth0user: string;
}
interface ClientDataIds {
    [key: string]: ClientDataId;
}

export const saveAuth0Session = (token: string) => {
    localStorage.setItem(`${tokenID}_${api}`, token);
};

export const getAuth0Session = () => {
    return localStorage.getItem(`${tokenID}_${api}`);
};
