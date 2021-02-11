import React from "react";

function Login() {
    return (
        <div>
            <button>
                <a
                    href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=user gist&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`}>
                    Login
                </a>
            </button>
        </div>
    );
}

export default Login;
