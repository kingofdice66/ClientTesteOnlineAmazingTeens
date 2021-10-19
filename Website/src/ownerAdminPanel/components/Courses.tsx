import React from "react";

function Courses(props: any): JSX.Element {
  const { subjectID } = props;

  return (
    <>
      <button type="button" style={{ width: 150 }}>
        <a
          href={`?highlight=cursuri&show=MakeCourse&subjectID=${subjectID}`}
          style={{ color: "black", textDecoration: "none" }}
        >
          Creează Curs
        </a>
      </button>
    </>
  );
}

export default Courses;
