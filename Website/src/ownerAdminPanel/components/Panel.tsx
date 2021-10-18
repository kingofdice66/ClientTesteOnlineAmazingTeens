import React from "react";
import Link from "../../customComponents/Link/Link";
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
      <Link />
      {subjects ? <Subjects /> : ""}
      {subjectID ? <Courses /> : ""}
    </>
  );
}

export default Panel;
