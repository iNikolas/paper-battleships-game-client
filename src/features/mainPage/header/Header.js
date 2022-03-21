import React, {useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logoImg from "./logo.webp";
import logoutImg from "./logout.svg";
import "./Header.css";
import {useDispatch, useSelector} from "react-redux";
import {logoutUserAsync} from "../../../common/userSlice";
import Dashboard from "../dashboard/Dashboard";


const Header = () => {
    const dispatch = useDispatch()
    const selectUserName = useSelector(state => state.user.user.name)
    const [showDashboard, setShowDashboard] = useState(false)

    const handleLogout = () => dispatch(logoutUserAsync())

    return (<>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>
                        {" "}
                        <img
                            src={logoImg}
                            width="45"
                            height="45"
                            className="d-inline-block align-top app-logo-img"
                            alt="PERN Todo logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as:{" "}
                            <button
                                className="user-name"
                                onClick={() => setShowDashboard(true)}
                            >
                                {selectUserName}
                            </button>
                        </Navbar.Text>
                        <img
                            src={logoutImg}
                            width="15"
                            height="15"
                            className="d-inline-block align-top m-1 logout-img"
                            alt="Logout"
                            onClick={handleLogout}
                        />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Dashboard setShowDashboard={setShowDashboard} showDashboard={showDashboard}/>
        </>
    );
};

export default Header;
