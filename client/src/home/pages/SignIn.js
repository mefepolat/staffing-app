import { useState, useContext } from "react";
import {Form, Button} from 'react-bootstrap';
import { UserContext } from "../../shared/components/UserContext";
import { useNavigate } from "react-router-dom";


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {login} = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        console.log(email)
        try {
            const response = await fetch('http://localhost:5001/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email,password})
            })
            const data = await response.json();
            const user = data.session;
            console.log(data)
            login(user);
            navigate('/');
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Form className="container-fluid" onSubmit={handleSubmit}>
            <Form.Group controlId='email'>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button type='submit'>{isLoading ? "Signing in..." : "Sign In"}</Button>
        </Form>
    )
};

export default SignIn;