import React from "react";
import { Redirect } from "react-router-dom";

function Login() {
    return localStorage.getItem("token") === null || localStorage.getItem("token").length === 0 ? (
        <div>
            <button>
                <a
                    href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=user gist&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`}>
                    Login
                </a>
            </button>
        </div>
    ) : (
        <Redirect to="/" />
    );
}

export default Login;
