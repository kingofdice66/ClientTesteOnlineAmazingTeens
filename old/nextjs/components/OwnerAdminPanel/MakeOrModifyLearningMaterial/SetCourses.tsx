import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import apiURL from "../../ApiURL/ApiURL";

const EXIT_SUCCESS = 0;
const EXIT_FAILED = 1;

function SetCourse(): JSX.Element {
  const router = useRouter();

  const {
    subjectId,
    courseId,
    getCourseName,
    showSetCoursesBtn,
    showSetChaptersBtn,
    updateOnType,
  } = router.query;

  /**
   * Count countRef to 0 in order for 'updateOnType' in  'useEffect' to not
   * send data to the database too early because 'setCourseName' on page load is
   * set to "" and that will trigger an early update to database.
   */
  const countRef = useRef<number>(2);
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
        // eslint-disable-next-line @typescript-eslint/no-shadow
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

  /**
   * Count countRef to 0 in order for 'updateOnType' in  'useEffect' to not
   * send data to the database too early because 'setCourseName' on page load is
   * set to "" and that will trigger an early update to database.
   */
  useEffect(() => {
    if (countRef.current !== 0) {
      countRef.current--;
    }
  }, [courseName]);

  /** Download current course name from database. */
  useEffect(() => {
    if (getCourseName === "yes") {
      axios
        .post(`${apiURL}/getCourseName`, { courseId, subjectId })
        .then((res: any) => setCourseName(res.data.name))
        .catch((err: any) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCourseName]);

  /** Update course name as you type. */
  useEffect(() => {
    if (updateOnType === "yes" && countRef.current === 0) {
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
