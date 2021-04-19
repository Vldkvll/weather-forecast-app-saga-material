import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import MainContainer from "./Component/MainContainer/MainContainer";
import MainCard from "./Component/Card/MainCard/MainCard";

function App() {
    return (
        <>
            <Router>
                
                <Switch>
                    <Route path="/" exact component={MainContainer} />
                    <Route path="/navbar"  component={Navbar} />
                    <Route path="/weather" component={MainCard} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
