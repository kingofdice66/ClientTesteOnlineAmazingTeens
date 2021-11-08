import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import apiURL from "../../ApiURL/ApiURL";
// import sendGetData from "../../customComponents/Fetch/sendGetData";
// import apiURL from "../../apiURL/ApiURL";
// import sendData from "../../customComponents/Fetch/sendData";

const EXIT_SUCCESS = 0;
const EXIT_FAILED = 1;

function SetCourse(): JSX.Element {
  const router = useRouter();
  const { subjectId } = router.query;

  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const [courseName, setCourseName] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");

  const uploadCourseNameToDatabase = (): number => {
    // ##################################################################
    // #####         If input field is empty, give a warning        #####
    // ##################################################################
    const pattern = /^[ ]*$/;
    if (courseName.length === 0 || pattern.test(courseName)) {
      setInputError("Campul nu poate fi gol");

      return EXIT_FAILED; // Exit. Don't send data to database.
    }
    // ##################################################################

    // const data = {
    //   courseName,
    //   subjectID,
    // };

    // sendGetData(`${apiURL}/api/setCourseName`, data).then(
    //   (data_: any) =>
    //     window.location.assign(
    //       `?OwnerAdminPanelShow=chapterName&updateChapterNameOnType=no&courseID=${data_.courseID}&subjectID=${subjectID}`
    //     ),
    //   (error) => console.error("Error: ", error)
    // );

    axios
      .post(`${apiURL}/setCoursesX`, { courseName, subjectId })
      .then((data: any) => console.log("data: ", data))
      .catch((err: any) => console.error(err));

    // console.log("courseId: ", courseId);

    return EXIT_SUCCESS;
  };

  /** Update course name as you type. */
  // useEffect(() => {
  //   if (updateCourseOnType === "yes") {
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }

  //     // Delay sending data for 0.75 seconds in order to not send on every key press.
  //     timeoutRef.current = setTimeout(() => {
  //       const data = {
  //         courseName,
  //         subjectID,
  //       };
  //       sendData(`${apiURL}/api/updateCourseName`, data);
  //     }, 0.75 * 1000);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [courseName]);

  return (
    <>
      <label htmlFor="courseName">
        <span>Numele cursului:</span>
        <br />
        <textarea
          id="courseName"
          placeholder="Scrie aici numele cursului ..."
          value={courseName}
          onChange={(e): void => {
            setCourseName(e.target.value);
          }}
        />
      </label>
      <br />
      {
        // prettier-ignore
        inputError.length !== 0 ? <div><span>{inputError}</span></div> : ""
      }
      <button type="button" onClick={uploadCourseNameToDatabase}>
        <span>Seteaza Numele Cursului</span>
      </button>
    </>
  );
}

export default SetCourse;
