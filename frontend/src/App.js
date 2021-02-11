import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/pages/Home";
import Loading from "./Components/pages/Loading";
import Login from "./Components/pages/Login";

function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Home />
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
