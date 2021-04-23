import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import MainContainer from "./Component/MainContainer/MainContainer";
import MainCard from "./Component/Card/MainCard/MainCard";

function App() {
    return (
        <>
            <Router>
            <Navbar />
                <Switch>
                    <Route path="/" exact component={MainContainer} />
                    <Route path="/navbar"  component={Navbar} />
                    <Route path="/weather" component={MainCard} />
                </Switch>
                <Footer />
            </Router>
        </>
    );
}

export default App;
