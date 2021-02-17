import React, { useState, useEffect } from "react";
import { useParams, Redirect, useLocation } from "react-router-dom";
import axios from "axios";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Todo() {
    const { id } = useParams();
    let query = useQuery();
    const [state, setState] = useState({
        newTodo: "",
        todos: [],
    });
    useEffect(() => {
        let token = localStorage.getItem("token");
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/todo`, {
                token: token,
                project: id,
            })
            .then(res => {
                setState({ ...state, todos: res.data });
            })
            .catch(err => console.log(err));
        // eslint-disable-next-line
    }, []);
    const handleChange = value => {
        setState({ ...state, newTodo: value });
    };
    const createTodo = e => {
        e.preventDefault();
        let token = localStorage.getItem("token");
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/todo/create`, {
                token: token,
                project: id,
                description: state.newTodo,
            })
            .then(res => {
                setState({ ...state, newTodo: "", todos: [...state.todos, res.data] });
            });
    };
    return localStorage.getItem("token") !== null && localStorage.getItem("token").length !== 0 ? (
        <div className="body-div d-flex flex-column pt-2">
            <div className="d-flex flex-row justify-content-between banner-div">
                <div className="mx-4">
                    <form className="form-group">
                        <h4 className="text-center banner-text">Create a new Todo</h4>
                        <label className="banner-text">Todo Description: </label>
                        <input
                            type="text"
                            className="my-form"
                            value={state.newTodo}
                            onChange={e => handleChange(e.target.value)}
                        />
                        <button className="btn create-button green-button" onClick={e => createTodo(e)}>
                            Create
                        </button>
                    </form>
                </div>
                <button className="button btn my-auto mr-3 green-button">Export as Gist</button>
            </div>
            <div>
                {state.todos.map((item, index) => {
                    return <h1 className="txt">{item.description}</h1>;
                })}
            </div>
        </div>
    ) : (
        <Redirect to="/login" />
    );
}

export default Todo;
