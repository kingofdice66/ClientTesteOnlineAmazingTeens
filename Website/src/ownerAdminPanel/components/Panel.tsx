import React from "react";
import Links from "./Links";
import Subjects from "./Subjects";
import Courses from "./Courses";

// ##############################################################
// #########              Get URL parameters            #########
// ##############################################################
const url: string = window.location.search;
const searchParams: URLSearchParams = new URLSearchParams(url);
const subjects: string = searchParams.get("subjects");
const subjectID: string = searchParams.get("subjectID");
// ##############################################################

function Panel(): JSX.Element {
  return (
    <>
      <Links />
      {subjects ? <Subjects /> : ""}
      {subjectID ? <Courses /> : ""}
    </>
  );
}

export default Panel;
