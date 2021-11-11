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

  const {
    subjectId,
    courseId,
    showSetCoursesBtn,
    showSetChaptersBtn,
    updateCoursesOnType,
  } = router.query;

  console.log("updateCoursesOnType: ", updateCoursesOnType);

  const timeoutRef = useRef<NodeJS.Timeout>();
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

    axios
      .post(`${apiURL}/setCourses`, { courseName, subjectId })
      .then((res: any) => {
        const { courseId } = res.data;

        router.replace(
          "/owner-admin-panel/learning-material/make-or-modify-learning-material?" +
            "set=chapters&" +
            "showSetChaptersBtn=yes&" +
            `subjectId=${subjectId}&` +
            `courseId=${courseId}`
        );
      })
      .catch((err: any) => console.error(err));

    setCourseName(""); // Clear textarea;

    return EXIT_SUCCESS;
  };

  /** Update course name as you type. */
  useEffect(() => {
    if (updateCoursesOnType === "yes") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Delay sending data for 0.75 seconds in order to not send on every key press.
      timeoutRef.current = setTimeout(() => {
        // prettier-ignore
        axios.post(`${apiURL}/updateCourses`, { courseName, subjectId, courseId });
      }, 0.75 * 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseName]);

  return (
    <div>
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
      <br />
      {
        // prettier-ignore
        inputError.length !== 0 ? <div><span>{inputError}</span></div> : ""
      }
      {
        // prettier-ignore
        showSetCoursesBtn === "yes" ? <button type="button" onClick={uploadCourseNameToDatabase}><span>Seteaza Numele Cursului</span></button> : ""
      }
    </div>
  );
}

export default SetCourse;
