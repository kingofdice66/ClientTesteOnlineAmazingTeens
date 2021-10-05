import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CoursesOffered from "../routes/CoursesOffered";

function Main(): JSX.Element {
    return (
        <Router>
            <Switch>
                <Route exact path="/Courses">
                    <CoursesOffered />
                </Route>
            </Switch>
        </Router>
    );
}

export default Main;
