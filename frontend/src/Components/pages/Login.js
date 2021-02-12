import React from "react";

function random() {
    return Math.floor(Math.random() * 100000000);
}

function Login() {
    return (
        <div>
            <button>
                <a
                    href={`https://github.com/login/oauth/authorize?client_id=${
                        process.env.REACT_APP_CLIENT_ID
                    }&scope=user gist&state=${random()}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`}>
                    Login
                </a>
            </button>
        </div>
    );
}

export default Login;
