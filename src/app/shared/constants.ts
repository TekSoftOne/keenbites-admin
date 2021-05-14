export const getUserRole = (userSession: any) => {
    if (!userSession) {
        return null;
    }
    const host = `${process.env.api}/roles`;
    const roles: string[] = userSession[host];

    let roleName = 'client';
    if (roles && roles.indexOf('admin') > -1) {
        roleName = 'admin';
    }

    return roleName;
};
