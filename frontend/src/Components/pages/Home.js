import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../../assets/home.css";
import axios from "axios";

function Home() {
    let history = useHistory();
    const [state, setState] = useState({
        projects: [],
    });
    useEffect(() => {
        let token = localStorage.getItem("token");
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/project`, {
                token: token,
            })
            .then(res => {
                setState({ ...state, projects: res.data });
            })
            .catch(err => console.log(err));
        // eslint-disable-next-line
    }, []);
    return localStorage.getItem("token") !== null && localStorage.getItem("token").length !== 0 ? (
        <div className="body-div d-flex flex-column pt-2">
            <div className="d-flex flex-row justify-content-between banner-div">
                <div className="mx-4">
                    <form className="form-group">
                        <h4 className="text-center banner-text">Create new Project</h4>
                        <label className="banner-text">Project Name: </label>
                        <input type="text" className="my-form" />
                        <Button className="create-button">Create</Button>
                    </form>
                </div>
                <Button
                    className="button my-auto mr-3"
                    onClick={() => {
                        localStorage.removeItem("token");
                        history.push("/login");
                    }}>
                    Logout
                </Button>
            </div>
            <div>
                {state.projects.map(items => {
                    return <h1>{items.title}</h1>;
                })}
            </div>
        </div>
    ) : (
        <Redirect to="/login" />
    );
}

export default Home;
