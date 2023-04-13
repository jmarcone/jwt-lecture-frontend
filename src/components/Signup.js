import React, { useRef } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import { useAuth } from "../context/AuthContext";

export default function Singup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const { registerUser, error, loading } = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault();
        await registerUser(nameRef.current.value, emailRef.current.value, passwordRef.current.value);
    }

    return (
        <>
            <Form onSubmit={handleSubmit} loading={loading} error={error}>
                <h2>Sign Up</h2>
                <Form.Field>
                    <label>Name</label>
                    <input name="name" ref={nameRef} required placeholder='Email' />
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input name="email" ref={emailRef} type='email' required placeholder='Email' />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input required name="password" type="password" ref={passwordRef} placeholder='Password' />
                </Form.Field>

                <Button type='submit'>Log in</Button>

                <Message error header={error} />
            </Form>

        </>
    );
}