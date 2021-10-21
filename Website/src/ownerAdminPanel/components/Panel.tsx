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
const OwnerAdminPanelShow: string = searchParams.get("OwnerAdminPanelShow");
// ##############################################################

function Panel(): JSX.Element {
  return (
    <>
      <OwnerAdminNavBar />
      {OwnerAdminPanelShow === "subjects" ? <Subjects /> : ""}
      {OwnerAdminPanelShow === "courses" ? <Courses /> : ""}
      {OwnerAdminPanelShow === "courseName" ? <CourseName /> : ""}
      {OwnerAdminPanelShow === "chapterName" ? <ChapterName /> : ""}
    </>
  );
}

export default Panel;
