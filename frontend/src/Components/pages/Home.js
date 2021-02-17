import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import "../../assets/Home.css";
import axios from "axios";
import ProjectCard from "../common/ProjectCard";

function Home() {
    let history = useHistory();
    const [state, setState] = useState({
        newProject: "",
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
    const handleChange = value => {
        setState({ ...state, newProject: value });
    };
    const createProject = e => {
        e.preventDefault();
        let token = localStorage.getItem("token");

        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/project/create`, {
                token: token,
                title: state.newProject,
            })
            .then(res => {
                setState({ ...state, newProject: "", projects: [...state.projects, res.data] });
            });
    };
    const handleProject = (item, index) => {
        let newProjects = [];
        for (let i = 0; i < state.projects.length; i++) {
            if (i === index) {
                newProjects.push(item);
            } else {
                newProjects.push(state.projects[i]);
            }
        }
        setState({ ...state, projects: newProjects });
    };
    return localStorage.getItem("token") !== null && localStorage.getItem("token").length !== 0 ? (
        <div className="body-div d-flex flex-column pt-2">
            <div className="d-flex flex-row justify-content-between banner-div flex-div">
                <div className="mx-4">
                    <form className="form-group flex-div">
                        <h4 className="text-center banner-text">Create new Project</h4>
                        <label className="banner-text">Project Name: </label>
                        <input
                            type="text"
                            className="my-form"
                            value={state.newProject}
                            onChange={e => handleChange(e.target.value)}
                        />
                        <button className="btn create-button green-button" onClick={e => createProject(e)}>
                            Create
                        </button>
                    </form>
                </div>
                <button
                    className="button btn my-auto mr-3 green-button"
                    onClick={() => {
                        localStorage.removeItem("token");
                        history.push("/login");
                    }}>
                    Logout
                </button>
            </div>
            <div>
                {state.projects.map((item, index) => {
                    return <ProjectCard item={item} index={index} handleProject={handleProject} />;
                })}
            </div>
        </div>
    ) : (
        <Redirect to="/login" />
    );
}

export default Home;
