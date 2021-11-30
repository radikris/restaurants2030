import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getToken, getUserRoles } from '../../util/agent';

export const PrivateRoute2 = ({children, roles}: {children: JSX.Element; roles: string[]; }) => {

    const [rol, setRol] = useState<string[] | null>(null);
    useEffect(() => {
        async function getR() {
            if (getToken() !== null) {
                const r = await getUserRoles();
                setRol(r);
            }
        }
        getR();
    }, []);

    const token = getToken();
    if (token == null) {
        return <Redirect to={{ pathname: '/login' }} />
    }

    if (rol != null) {
        const found = roles.some(role => rol.includes(role));
    if (!found) {
        return <Redirect to={{pathname: '/'}} />
    }

    return children;
    } else {
        return <p>Loading...</p>
    }
}