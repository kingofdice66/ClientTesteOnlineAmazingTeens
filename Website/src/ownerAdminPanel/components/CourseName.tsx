import React, { useState } from "react";
import apiURL from "../../apiURL/ApiURL";
import sendGetData from "../../customComponents/Fetch/sendGetData";

const EXIT_SUCCESS = 0;
const EXIT_FAILED = 1;

interface IProps {
  subjectID: number;
}

function CourseName(props: IProps): JSX.Element {
  const { subjectID } = props;

  const [courseName, setCourseName] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");

  const uploadCourseNameToDatabase = (): number => {
    // #################################################################################
    // ##########           If input field is empty, give a warning           ##########
    // #################################################################################
    const pattern = /^[ ]*$/;
    if (courseName.length === 0 || pattern.test(courseName)) {
      setInputError("Campul nu poate fi gol!");
      return EXIT_FAILED; // Exit. Don't send data to database. The function caller doesn't use the value of 'EXIT_FAILED'. This is just a dummy to exit the function upon failed conditions.
    }
    // #################################################################################

    const data = {
      courseName,
      subjectID,
    };

    sendGetData(`${apiURL}/api/setCourseName`, data).then(
      (data_: any) =>
        window.location.assign(
          `?highlight=cursuri&courseShow=chapterName&courseID=${data_.courseID}&subjectID=${subjectID}`
        ),
      (error) => console.log("Error: ", error)
    );

    return EXIT_SUCCESS; // The function caller doesn't use the value of 'EXIT_SUCCESS'. This is just a dummy.
  };

  return (
    <>
      <div className="chapterAndCourseNameInput-wrapper">
        <div className="chapterAndCourseNameInput">
          <label htmlFor="courseName">
            <span>Numele cursului:</span>
            <br />
            <textarea
              id="courseName"
              placeholder="Scrie aici numele cursului ..."
              value={courseName}
              onChange={(e): void => setCourseName(e.target.value)}
            />
          </label>
          {/* <div>{networkError.courseName}</div>
          {inputError.courseName.length !== 0 ? (
            <div>{inputError.courseName}</div>
          ) : (
            ""
          )} */}
          <br />
        </div>
        <button type="button" onClick={uploadCourseNameToDatabase}>
          Seteaza numele cursului
        </button>
      </div>
    </>
  );
}

export default CourseName;
