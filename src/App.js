import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Singup from "./components/Signup";
import Layout from "./components/Layout";
import Me from "./components/Me";
import { useEffect, useState } from "react";
import { createContext, useContext } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container } from "semantic-ui-react";
import Home from "./components/Home";
import AuthState from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  const [user, setUser] = useState({});


  // useEffect(() => {
  //   if (!user?.token) {
  //     setUser(JSON.parse(localStorage.getItem("user")));
  //   }

  // }, [user]);

  return (
    <AuthState >
      <Container>

        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Singup />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/me" element={<Me />} />
            </Route>

          </Route>
        </Routes>

      </Container>
    </AuthState>
  );
}

export { App as default };
