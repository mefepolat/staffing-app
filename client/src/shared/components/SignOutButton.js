import { useContext } from "react";
import { UserContext } from "./UserContext";
import {redirect} from 'react-router';
import { Button } from "react-bootstrap";


const SignOutButton = () => {
    const {logout} = useContext(UserContext);

    const handleSignOut = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Policy': 'application/json'
                }
            });
            console.log(response)
            logout();
            redirect('/');
        } catch (err){
            console.log(err);
        }
    }

    return (
        <Button href='/logout' onClick={handleSignOut}>Sign Out</Button>
    )
}

export default SignOutButton;