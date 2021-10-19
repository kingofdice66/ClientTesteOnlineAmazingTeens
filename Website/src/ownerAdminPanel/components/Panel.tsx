import React, { useState, useEffect } from "react";
import Link from "../../customComponents/Link/Link";
import URLSearchParameters from "../../customComponents/URLSearchParameters/URLSearchParameters";
import Subjects from "./Subjects";
import Courses from "./Courses";

// ##############################################################
// #########              Get URL parameters            #########
// ##############################################################
// const url: string = window.location.search;
// const searchParams: URLSearchParams = new URLSearchParams(url);
const subjectID: number = parseInt(URLSearchParameters.get("subjectID"), 10);
// ##############################################################

function Panel(): JSX.Element {
  const [page, setPage] = useState<string>("");

  const popstate = (): void => {
    setPage(URLSearchParameters.get("highlight"));
  };

  useEffect(() => {
    /** Must use 'popstate' to reload page otherwise components selection won't work as intended. */
    window.addEventListener("popstate", () => {
      window.location.reload();
    });
    popstate();
  }, []);

  return (
    <>
      <div style={{ color: "white" }}>
        <Link
          to="?highlight=subjects"
          name="CURSURI"
          highlight="subjects"
          setPage={setPage}
          tabIndex={0}
        />
      </div>
      <Link
        to="?highlight=courses"
        name="ADMINISTRATORII CURSULUI"
        highlight="NULL"
        setPage={setPage}
        tabIndex={-1}
      />

      {page === "subjects" ? <Subjects setPage={setPage} /> : ""}
      {page === "courses" ? <Courses /> : ""}
    </>
  );
}

export default Panel;
