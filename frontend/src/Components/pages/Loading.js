import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Loading() {
    let query = useQuery();
    let history = useHistory();
    useEffect(() => {
        const code = query.get("code");
        if (code === null) {
            history.push("/");
        } else {
            axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/auth/github`, {
                    code,
                })
                .then(res => {
                    //save it in local storage
                    console.log(res.data.token);
                    localStorage.setItem("token", res.data.token);
                    history.push("/");
                })
                .catch(err => console.log(err));
        }
    }, [query, history]);
    return localStorage.getItem("token") === null || localStorage.getItem("token").length === 0 ? (
        <div>
            <h1>Loading....</h1>
        </div>
    ) : (
        <Redirect to="/" />
    );
}

export default Loading;
