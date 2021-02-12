import React from "react";
import { Redirect, useHistory } from "react-router-dom";

function Home() {
    let history = useHistory();
    return localStorage.getItem("token") !== null && localStorage.getItem("token").length !== 0 ? (
        <div>
            <h1>Home</h1>
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    history.push("/login");
                }}>
                Logout
            </button>
        </div>
    ) : (
        <Redirect to="/login" />
    );
}

export default Home;
