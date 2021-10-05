import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CourseChapters from "../routes/CourseChapters";
import CoursesOffered from "../routes/CoursesOffered";

function Main(): JSX.Element {
    return (
        <Router>
            <Switch>
                <Route exact path="/Courses">
                    <CoursesOffered />
                </Route>
            </Switch>
            <Switch>
                <Route path="/Chapters">
                    <CourseChapters />
                </Route>
            </Switch>
        </Router>
    );
}

export default Main;
