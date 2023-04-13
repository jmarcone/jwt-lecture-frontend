import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Me() {
    const { token, getUserData } = useAuth()
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        console.log(token);
        getUserData(token)
            .then((userData) => setUserData(userData))
    }, [])

    return (
        <>
            <h2>My data!</h2>
            {
                userData &&
                <div>
                    <div>Name: {userData.name}</div>
                    <div>Email: {userData.email}</div>
                </div>
            }
        </>
    )
}