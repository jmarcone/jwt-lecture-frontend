import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Container, Menu, Segment } from "semantic-ui-react";
import { useAuth } from "../context/AuthContext";


export default () => {
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <Container >
            <h1 className="ui header">
                <i className="settings icon"></i>
                <div className="content">
                    JWT Front-end
                    <div className="sub header">React session handling with JWT and local storage</div>
                </div>
            </h1>
            <Menu pointing secondary>
                <Menu.Item
                    as={NavLink}
                    to="/"
                    name='home'
                />

                {isAuthenticated
                    ?
                    <>
                        <Menu.Item
                            as={NavLink}
                            to="/me"
                            name='me'
                        />

                        <Menu.Menu position='right'>
                            <Menu.Item
                                name='logout'
                                onClick={logout}
                                content={`${user?.email} - logout`}
                                color='red'
                            />
                        </Menu.Menu>
                    </>

                    :

                    <>
                        <Menu.Item
                            as={NavLink}
                            to="/login"
                            name='login'
                        />
                        <Menu.Item
                            as={NavLink}
                            to="/signup"
                            name='signup'
                        />
                    </>

                }
            </Menu>

            <Segment>
                <Outlet />
            </Segment>


        </Container>
    );
}