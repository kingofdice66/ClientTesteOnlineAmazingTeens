import React, { useState, useEffect } from "react";
import apiURL from "../../apiURL/ApiURL";
import getData from "../../customComponents/Fetch/getData";

function Subjects(): JSX.Element {
  const [subjects, setSubjects] = useState({ data: null });
  const [subjectName, setSubjectName] = useState<string>("");

  useEffect(() => {
    getData(`${apiURL}/api/getSubjects`).then(
      (data) => console.log("data: ", data),
      (error) => console.error("Error: ", error)
    );
  }, []);

  return (
    <>
      <label htmlFor="makeSubject">
        Crează subiect: <br />
        <textarea id="makeSubject" cols={30} rows={3} />
        <br />
      </label>
      <button type="button" style={{ width: 100 }}>
        Creează
      </button>
    </>
  );
}

export default Subjects;
