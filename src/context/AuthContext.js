import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthState = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [error, setError] = useState(null);


    const getUserData = async () => {
        const { data } = await axios.get("http://localhost:3030/jwt/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return data;
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                setLoading(true);
                const data = await getUserData();
                setUser(data);
                setIsAuthenticated(true);
                setLoading(false);
            } catch (error) {
                setToken(null);
                localStorage.removeItem('token');
                setLoading(false);
            }
        };
        token && getUser();
    }, [token]);

    const registerUser = async (name, email, password) => {
        try {
            setLoading(true);

            const { data: token } = await axios.post("http://localhost:3030/jwt/signup", {
                name: name,
                email: email,
                password: password,

            })


            localStorage.setItem('token', token);
            setToken(token);
            setIsAuthenticated(true);
            setLoading(false);
            navigate('/me', { replace: true });
        } catch (error) {
            setLoading(false);
            setError(error.response.data.error)
        }
    };

    const loginUser = async (email, password) => {
        try {
            setLoading(true);
            const { data: token } = await axios.post("http://localhost:3030/jwt/signin", {
                email: email,
                password: password,
            })

            localStorage.setItem('token', token);
            setToken(token);
            setIsAuthenticated(true);
            setLoading(false);
            navigate('/me', { replace: true });
        } catch (error) {
            setLoading(false);
            setError(error.response.data.error)
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    return <AuthContext.Provider value={{ loading, isAuthenticated, registerUser, loginUser, logout, user, getUserData, error }}>{children}</AuthContext.Provider>;
};

export default AuthState;