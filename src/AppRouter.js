import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./index.css";
import App from "./App";
import PrivateRoute from './PrivateRoute';
import Login from "./Login";
import SignUp from "./SignUp";
import LoginHandeler from "./LoginHandeler";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            fsoftwareengineer, {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/login" element={<Login />} ></Route>
                        <Route path="/signup" element={<SignUp />} ></Route>
                        <Route path="/" element={
                            <PrivateRoute>
                                <App />
                            </PrivateRoute>
                        } ></Route>
                        <Route path="/login/oauth2/callback/kakao" element={
                            <LoginHandeler />
                        } ></Route>
                    </Routes>
                </div>
                <div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </div>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
