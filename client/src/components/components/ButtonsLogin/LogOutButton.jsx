import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function LogOutButton({text="LogOut"}) {
    const { logout } = useAuth0();
    return (
        <div onClick={() =>  logout()}>
            {text}
        </div>
    );
}

export default LogOutButton