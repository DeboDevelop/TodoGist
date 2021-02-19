import React, { useState, useEffect } from "react";
import { useParams, Redirect, useLocation } from "react-router-dom";
import axios from "axios";
import TodoCard from "../../common/TodoCard/TodoCard";
import "../../../assets/css/Home.css";
import loadingGif from "../../../assets/img/loading.gif";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function formatFile(todos, project) {
    let result = `# ${project} \n\n`;
    let completeTodo = "";
    let incompleteTodo = "";
    let count = 0;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].status === true) {
            count++;
            completeTodo += `- [x] ${todos[i].description}\n`;
        } else {
            incompleteTodo += `- [ ] ${todos[i].description}\n`;
        }
    }
    result += `**Summary:** ${count}/${todos.length} completed\n\n\n`;
    result += `### Pending\n\n`;
    result += incompleteTodo + "\n";
    result += `### Completed\n\n`;
    result += completeTodo + "\n";
    return result;
}

function Todo() {
    const { id } = useParams();
    let query = useQuery();
    const [state, setState] = useState({
        newTodo: "",
        todos: [],
        loading: true,
    });
    useEffect(() => {
        let token = localStorage.getItem("token");
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/todo`, {
                token: token,
                project: id,
            })
            .then(res => {
                setState({ ...state, todos: res.data, loading: false });
            })
            .catch(err => {
                console.log(err);
                setState({ ...state, loading: false });
            });
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
    const handleTodo = (item, index) => {
        let newTodo = [];
        for (let i = 0; i < state.todos.length; i++) {
            if (i === index) {
                newTodo.push(item);
            } else {
                newTodo.push(state.todos[i]);
            }
        }
        setState({ ...state, todos: newTodo });
    };
    const hanldeDeleteTodo = index => {
        let newTodo = [];
        for (let i = 0; i < state.todos.length; i++) {
            if (i !== index) {
                newTodo.push(state.todos[i]);
            }
        }
        setState({ ...state, todos: newTodo });
    };
    const exportGist = e => {
        e.preventDefault();
        let token = localStorage.getItem("token");
        let project_name = query.get("name");
        let result = formatFile(state.todos, project_name);
        project_name += ".md";
        let data = {
            public: false,
            files: {},
        };
        data.files[project_name] = { content: result };
        console.log(data);
        console.log("Token: " + token);
        let header = {
            headers: {
                Authorization: `token ${token}`,
                Accept: "application/vnd.github.v3+json",
            },
        };
        // axios.defaults.headers.common["Authorization"] = `token ${token}`;
        // axios.defaults.headers.common["Accept"] = "application/vnd.github.v3+json";
        axios
            .post("https://api.github.com/gists", data, header)
            .then(res => {
                if (res.status === 201) {
                    alert("Exported as Gist");
                }
                console.log(res.data);
            })
            .catch(err => console.log(err));
    };
    return localStorage.getItem("token") !== null && localStorage.getItem("token").length !== 0 ? (
        <div className="body-div d-flex flex-column pt-2">
            <div className="flex-col-div banner-div flex-div">
                <div className="mx-4">
                    <form className="form-group flex-div">
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
                <button className="btn my-sm-auto mr-3 green-button export" onClick={e => exportGist(e)}>
                    Export as Gist
                </button>
            </div>
            {state.loading === true ? (
                <img src={loadingGif} alt="loading" className="mx-auto loading" />
            ) : (
                <div className="d-flex flex-row flex-wrap justify-content-center">
                    {state.todos.map((item, index) => {
                        return (
                            <TodoCard
                                item={item}
                                index={index}
                                handleTodo={handleTodo}
                                hanldeDeleteTodo={hanldeDeleteTodo}
                                project={id}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    ) : (
        <Redirect to="/login" />
    );
}

export default Todo;
