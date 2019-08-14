import React from 'react';
import { BrowserRouter,Route,} from 'react-router-dom';

import SignInPage from "../components/SignIn";
import Home from "../components/Home";
import SignUpPage from "../components/SignUp";

export default function Routes(params) {
    return (
        <BrowserRouter>
            <Route path="/" exact component={SignUpPage} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/home" component={Home} />
        </BrowserRouter>
    );
}