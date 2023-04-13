import React, { useRef } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import { useAuth } from "../context/AuthContext";


export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { error, loading, loginUser } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();

        await loginUser(emailRef.current.value, passwordRef.current.value)
    }

    return (
        <>
            <Form onSubmit={handleSubmit} loading={loading} error={error && error.length !== 0}>
                <h2>Log in</h2>
                <Form.Field>
                    <label>Email</label>
                    <input name="email" type="email" ref={emailRef} required placeholder='Email' />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input required name="password" type="password" ref={passwordRef} placeholder='Password' />
                </Form.Field>

                <Button type='submit'>Log in</Button>

                <Message
                    error
                    header={error}
                />
            </Form>
        </>
    );
}