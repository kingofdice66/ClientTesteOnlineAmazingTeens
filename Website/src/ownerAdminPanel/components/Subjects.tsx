import React, { useState, useEffect } from "react";
import apiURL from "../../apiURL/ApiURL";
import getData from "../../customComponents/Fetch/getData";
import setData from "../../customComponents/Fetch/sendData";

function Subjects(): JSX.Element {
  const [subjects, setSubjects] = useState({ data: null });
  const [subjectName, setSubjectName] = useState<string>("");

  const submitSubject = (): void => {
    setData(`${apiURL}/api/setSubject`, subjectName);
  };

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
        <textarea
          id="makeSubject"
          cols={30}
          rows={3}
          value={subjectName}
          onChange={(e): void => setSubjectName(e.target.value)}
        />
        <br />
      </label>
      <button type="button" style={{ width: 100 }} onClick={submitSubject}>
        Creează
      </button>
      <br />
      {subjects.data !== null ? <div>SUBJECTS</div> : ""}
    </>
  );
}

export default Subjects;
