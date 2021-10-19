import React from "react";
import OwnerNavBarAdmin from "./OwnerNavBarAdmin";
// import MakeCourseForm from "./MakeCourseForm";
import CourseName from "./CourseName";
import Subjects from "./Subjects";
import Courses from "./Courses";

// ##############################################################
// #########              Get URL parameters            #########
// ##############################################################
const url: string = window.location.search;
const searchParams: URLSearchParams = new URLSearchParams(url);
const subjectID: number = parseInt(searchParams.get("subjectID"), 10);
const courseID: number = parseInt(searchParams.get("courseID"), 10);
const chapterID: number = parseInt(searchParams.get("chapterID"), 10);
const courseShow: string = searchParams.get("courseShow");
const show: string = searchParams.get("show");
// ##############################################################

function Panel(): JSX.Element {
  return (
    <>
      <OwnerNavBarAdmin />
      {show === "subjects" ? <Subjects /> : ""}
      {show === "courses" ? <Courses subjectID={subjectID} /> : ""}
      {/* {makeCourseShow === "MakeCourse" ? (
        <MakeCourseForm
          subjectID={subjectID}
          courseID={courseID}
          chapterID={chapterID}
        />
      ) : (
        ""
      )} */}
      {courseShow === "courseName" || courseShow === "all" ? (
        <CourseName subjectID={subjectID}/>
      ) : (
        ""
      )}
      {courseShow === "chapterName" || courseShow === "all" ? "" : ""}
    </>
  );
}

export default Panel;
