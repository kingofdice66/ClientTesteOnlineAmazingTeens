import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChapterDescription from "../routes/ChapterDescription";
import CourseChapters from "../routes/CourseChapters";
import CourseDescription from "../routes/CourseDescription";
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
            <Switch>
                <Route path="/CourseDescription">
                    <CourseDescription />
                </Route>
            </Switch>
            <Switch>
                <Route path="/ChapterDescription">
                    <ChapterDescription />
                </Route>
            </Switch>
        </Router>
    );
}

export default Main;
