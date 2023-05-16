
import { useAuth0 } from '@auth0/auth0-react'

function LoginButton({text="Login"}) {
    const { loginWithRedirect } = useAuth0();
    return (
        <div onClick={() => loginWithRedirect()}>
            {text}
        </div>
    );
}

export default LoginButton;