import React, { useState, useEffect, useReducer } from "react";
import { v4 as uuidV4 } from "uuid";
import apiURL from "../../apiURL/ApiURL";
import getData from "../../customComponents/Fetch/getData";
import setData from "../../customComponents/Fetch/sendData";

function Subjects(): JSX.Element {
  const [subjects, setSubjects] = useState({ data: null });
  const [subjectName, setSubjectName] = useState<string>("");

  const getSubjects = (): void => {
    getData(`${apiURL}/api/getSubjects`).then(
      (data) =>
        setSubjects((prevState: any) => {
          // eslint-disable-next-line no-param-reassign
          prevState.data = data.subjects;
          return { ...prevState };
        }),
      (error) => console.error("Error: ", error)
    );
  };

  const submitSubject = (): void => {
    setData(`${apiURL}/api/setSubject`, subjectName);
    setSubjectName(""); // Clear textarea.
    getSubjects();
  };

  useEffect(() => {
    getSubjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <button type="button" style={{ width: 200 }} onClick={submitSubject}>
        Creează Subiect
      </button>
      <br />
      {subjects.data !== null ? (
        <>
          {subjects.data.map((x: any) => (
            <React.Fragment key={uuidV4()}>
              {/* prettier-ignore */}
              <a href={`./OwnerAdminPanel.html?highlight=courses&OwnerAdminPanelShow=courses&subjectID=${x.id}`}>
                {x.name}
              </a>
            </React.Fragment>
          ))}
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Subjects;
