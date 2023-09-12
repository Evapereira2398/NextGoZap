import React, {useState} from "react";
import { BottomItems, ChangeSession, Container, Layout, LogoutButton, MenuItems, StyledIcon1, StyledIcon2, StyledIcon3, StyledIcon4 } from "./style";
import {NavLink} from "react-router-dom";
import ChangeSessionDialog from "../ChangeSession";
import {getSession, getToken} from "../../services/auth";
import api from "../../services/api";
import logo from '../../assets/LOGO BONECO 1.png';
import closebottom from '../../assets/CloseSession.png';

const Sidebar = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedValue, setSelectedValue] = useState(getSession());

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = (value) => {
        setOpenDialog(false);
        setSelectedValue(value);
    };

    const handleClickDisabled = (e) => {
        e.preventDefault();
    };

    async function logoutSession(e) {
        e.preventDefault();

        const config = {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
        await api.post(`${getSession()}/logout-session`, null, config);
        window.location.href = "/";
    }

    async function closeSession() {
        const config = {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
        await api.post(`${getSession()}/close-session`, null, config);
        window.location.href = "/nova-sessao";
    }

    return (
        <Layout>
            

            <Container>
                <img src={logo} id="logo" alt="Logo" style={{ width: '40px', height: '40px'}}/>

                <MenuItems>
                    <li>
                        <NavLink to={"chat"} activeClassName={"selected"}>
                            <StyledIcon1 />
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={"kanban"} activeClassName={"selected"}>
                            <StyledIcon2 />
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={"disparo"} activeClassName={"selected"}>
                            <StyledIcon3 />
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={"definirmsgpage"} activeClassName={"selected"}>
                            <StyledIcon4 />
                        </NavLink>
                    </li>
                </MenuItems>

                <BottomItems>
                    
                    <LogoutButton onClick={() => closeSession()}>
                        <img src={closebottom} alt="close-botton" style={{ width: '40px', height: '40px'}}/>
                    </LogoutButton>

                </BottomItems>
                
            </Container>

        </Layout>
    );
};

export default Sidebar;
