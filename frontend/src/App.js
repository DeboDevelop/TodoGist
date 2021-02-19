import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/pages/Home/Home";
import Loading from "./Components/pages/Loading/Loading";
import Login from "./Components/pages/Login/Login";
import Todo from "./Components/pages/Todo/Todo";

function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/project/:id">
                    <Todo />
                </Route>
                <Route exact path="/github/callback">
                    <Loading />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
