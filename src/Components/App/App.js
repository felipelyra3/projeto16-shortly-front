import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import GlobalStyle from "../../Styles/globalStyles";
import UserContext from "../Contexts/UserContext";
import Homescreen from "../Homescreen/Homescreen";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import LoggedHomepage from "../LoggedHomepage/LoggedHomepage";
import LoggedRanking from "../LoggedRanking/LoggedRanking";

export default function App() {
    const [name, setName] = useState('');
    //const BASE_URL = 'http://localhost:4000';
    const BASE_URL = 'https://shortly-backend1.herokuapp.com';
    /* const getRanking = 'http://localhost:4000/ranking';
    const postSignUp = 'http://localhost:4000/signup';
    const postSignIn = 'http://localhost:4000/signin';
    const getUsersMe = 'http://localhost:4000/users/me';
    const postUrlsShorten = 'http://localhost:4000/urls/shorten';
    const deleteUrl = 'http://localhost:4000/urls/';
    const getUrlOpenShortUrl = 'http://localhost:4000/urls/open/';
    const deleteSignOut = 'http://localhost:4000/signout';
    const deleteSignOutAll = 'http://localhost:4000/signoutall'; */

    return (
        <>
            <UserContext.Provider value={{ name, setName, BASE_URL }}>
                <GlobalStyle />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Homescreen />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/logged" element={<LoggedHomepage />} />
                        <Route path="/ranking" element={<LoggedRanking />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
};