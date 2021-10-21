import React from "react";
import OwnerAdminNavBar from "./AdminNavbar";
import Subjects from "./Subjects";
import Courses from "./Courses";
import CourseName from "./CourseName";
import ChapterName from "./ChapterName";

// ##############################################################
// #########              Get URL parameters            #########
// ##############################################################
const url: string = window.location.search;
const searchParams: URLSearchParams = new URLSearchParams(url);
const subjects: string = searchParams.get("subjects");
const subjectID: number = parseInt(searchParams.get("subjectID"), 10);
const show: string = searchParams.get("show");
// ##############################################################

function Panel(): JSX.Element {
  return (
    <>
      <OwnerAdminNavBar />
      {show === "subjects" ? <Subjects /> : ""}
      {show === "courses" ? <Courses /> : ""}
      {show === "courseName" ? <CourseName subjectID={subjectID} /> : ""}
      {show === "chapterName" ? <ChapterName /> : ""}
    </>
  );
}

export default Panel;
