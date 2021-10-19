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
const subjectID: string = searchParams.get("subjectID");
const courseID: number = parseInt(searchParams.get("courseID"), 10);
const chapterID: number = parseInt(searchParams.get("chapterID"), 10);
const show: string = searchParams.get("show");
// ##############################################################

function Panel(): JSX.Element {
  return (
    <>
      <OwnerNavBarAdmin />
      {show === "subjects" ? <Subjects /> : ""}
      {show === "courses" ? <Courses subjectID={subjectID} /> : ""}
      {show === "MakeCourse" ? (
        <MakeCourseForm
          subjectID={subjectID}
          courseID={courseID}
          chapterID={chapterID}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Panel;
