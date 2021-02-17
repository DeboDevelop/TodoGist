import React from "react";
import { Redirect } from "react-router-dom";
import "../../assets/css/Login.css";

function Login() {
    return localStorage.getItem("token") === null || localStorage.getItem("token").length === 0 ? (
        <div className="login-div">
            <button className="btn github-btn">
                <a
                    className="anchor"
                    href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=user gist&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`}>
                    Login in With Github
                </a>
            </button>
        </div>
    ) : (
        <Redirect to="/" />
    );
}

export default Login;
