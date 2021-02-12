import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Loading() {
    let query = useQuery();
    useEffect(() => {
        const code = query.get("code");
        const state = query.get("state");
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/auth/github`, {
                code,
                state,
            })
            .then(res => {
                //save it in local storage
                console.log(res.data.token);
            })
            .catch(err => console.log(err));
    }, [query]);
    return (
        <div>
            <h1>Loading....</h1>
        </div>
    );
}

export default Loading;
