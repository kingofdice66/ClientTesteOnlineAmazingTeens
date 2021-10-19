import React, { useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
import apiURL from "../../apiURL/ApiURL";
import sendGetData from "../../customComponents/Fetch/sendGetData";

interface IProps {
  subjectID: number;
}

function Courses(props: IProps): JSX.Element {
  const { subjectID } = props;

  const [courses, setCourses] = useState({ data: null });

  /** Get courses from the database. */
  useEffect(() => {
    sendGetData(`${apiURL}/api/getCourses`, subjectID).then(
      (data: any) =>
        setCourses((prevState) => {
          // eslint-disable-next-line no-param-reassign
          prevState.data = data.courses;
          return { ...prevState };
        }),

      (error) => console.error("Error: ", error)
    );
    // console.log("data: ", courses.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <a
        href={`?highlight=cursuri&courseShow=courseName&subjectID=${subjectID}`}
        style={{
          width: 100,
          color: "white",
          textDecoration: "none",
          backgroundColor: "green",
          textAlign: "center",
        }}
      >
        Creează Curs
      </a>

      <br />
      {courses.data !== null
        ? courses.data.map((x: any) => <div key={uuidV4()}>{x.name}</div>)
        : ""}
    </>
  );
}

export default Courses;
