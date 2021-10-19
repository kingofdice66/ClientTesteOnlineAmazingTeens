import React from "react";
import OwnerNavBarAdmin from "./OwnerNavBarAdmin";
import MakeCourseForm from "./MakeCourseForm";
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
      <OwnerNavBarAdmin />
      {subjects ? <Subjects /> : ""}
      {subjectID ? <Courses /> : ""}
      {true ? <MakeCourseForm /> : ""}
    </>
  );
}

export default Panel;
