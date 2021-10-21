import React from "react";

// ##############################################################
// #########              Get URL parameters            #########
// ##############################################################
const url: string = window.location.search;
const searchParams: URLSearchParams = new URLSearchParams(url);
const subjectID: number = parseInt(searchParams.get("subjectID"), 10);
// ##############################################################

function Courses(): JSX.Element {
  return (
    <>
      <button type="button" style={{ width: 100 }}>
        <a
          href={`./OwnerAdminPanel.html?updateCourseOnType=no&OwnerAdminPanelShow=courseName&subjectID=${subjectID}`}
          style={{ color: "black", textDecoration: "none" }}
        >
          Creează Curs
        </a>
      </button>
    </>
  );
}

export default Courses;
