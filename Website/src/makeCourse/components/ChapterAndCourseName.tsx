import React, { useState, useEffect, useRef } from "react";
import apiURL from "../../apiURL/ApiURL";
import sendGetData from "../../customComponents/Fetch/sendGetData";
import sendData from "../../customComponents/Fetch/sendData";
import "./ChapterAndCourseName.scss";

const EXIT_SUCCESS = 0;
const EXIT_FAILED = 1;

interface ICourse {
  courseName: string;
  chapterName: string;
}

interface IProps {
  urlIDs: {
    chapterID: number;
    courseID: number;
    subjectID: number;
  };
}

interface IVisibility {
  courseName: boolean;
  chapterName: boolean;
  setCourseButton: boolean;
  setChapterButton: boolean;
}

interface ITimeout {
  courseName: NodeJS.Timeout;
  chapterName: NodeJS.Timeout;
}

interface IInputError {
  courseName: string;
  chapterName: string;
}

type INetworkError = IInputError;

function ChapterAndCourseName(props: IProps): JSX.Element {
  /**
   * This is used to prevent 'useEffect(()=> {...},[course.courseName])' and'useEffect(()=> {...},[course.chapterName])'
   * form updating data to the database too early.
   * First, the course.courseName="" and course.chapterName="" are set to ""
   * and then subsequently those 2 are set
   * to the values that are obtained from the database which will use the 'useEffect' too early.
   */
  const countRef = useRef<number>(4);
  const timeoutRef = useRef<ITimeout>({
    courseName: null,
    chapterName: null,
  });
  const [visibility, setVisibility] = useState<IVisibility>({
    courseName: true, // This is hidden only when the name of the course is set.
    chapterName: false, // Visible only if the name of the course is set.
    setCourseButton: true,
    setChapterButton: false,
  });
  const [course, setCourse] = useState<ICourse>({
    courseName: "",
    chapterName: "",
  });
  // This is for when there is some sort of error in the input fields like leaving the field empty.
  const [inputError, setInputError] = useState<IInputError>({
    chapterName: "",
    courseName: "",
  });
  // This is for when there is some sort of error with the network when we set the name of the course.
  const [networkError, setNetworkError] = useState<INetworkError>({
    courseName: "",
    chapterName: "",
  });

  const { urlIDs } = props; // In order to upload data to database in correct location.
  const { courseID, chapterID, subjectID } = urlIDs;

  const getDataFromDatabase = (): void => {
    sendGetData(`${apiURL}/api/getCourseAndChapterName`, urlIDs).then(
      (data: any) => {
        // console.log("data = ", data);
        if (data.courseName !== null) {
          setCourse((prevState) => {
            // eslint-disable-next-line no-param-reassign
            prevState.courseName = data.courseName;

            return { ...prevState };
          });
        }
        if (data.chapterName !== null) {
          setCourse((prevState) => {
            // eslint-disable-next-line no-param-reassign
            prevState.chapterName = data.chapterName;

            return { ...prevState };
          });
        }
      },
      (errorMsg) => {
        console.log("Error: ", errorMsg);
      }
    );
  };

  const setVisibilityFunction = (): void => {
    // If 'courseID' is set but not 'chapterID' means that the name of the course is set but not the chapter name.
    if (courseID !== null && chapterID === null) {
      setVisibility((prevState) => {
        // eslint-disable-next-line no-param-reassign
        prevState.chapterName = true;
        // eslint-disable-next-line no-param-reassign
        prevState.courseName = false;
        // eslint-disable-next-line no-param-reassign
        prevState.setCourseButton = false;
        // eslint-disable-next-line no-param-reassign
        prevState.setChapterButton = true;

        return { ...prevState };
      });
      // If both 'courseID' and 'chapterID' are set means that both course name and chapter name are set.
    } else if (courseID !== null && chapterID !== null) {
      setVisibility((prevState) => {
        // eslint-disable-next-line no-param-reassign
        prevState.chapterName = true;
        // eslint-disable-next-line no-param-reassign
        prevState.courseName = true;
        // eslint-disable-next-line no-param-reassign
        prevState.setChapterButton = false;
        // eslint-disable-next-line no-param-reassign
        prevState.setCourseButton = false;

        return { ...prevState };
      });
      getDataFromDatabase();
    } else {
      console.log("Condition failed in 'useEffect()' visibility");
    }
  };

  /* To be called once when the page loads. */
  useEffect(() => {
    setVisibilityFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Count countRef to 0 in order for 'useEffect(()=>{...},[course.courseName])' and 'useEffect(()=>{...},[course.chapterName])'
   * to not send data to the database too early because 'course.courseName=""' and 'course.chapterName=""' and then
   * subsequently it is set to a value coming from the database which will
   * call those 2 'useEffect' ,mentioned at the beginning, each time those changes take effect.
   * */
  useEffect(() => {
    if (countRef.current !== 0) {
      countRef.current--;
    }
  }, [course.courseName, course.chapterName]);

  /** Update the name of the course as you type. */
  useEffect(() => {
    if (countRef.current === 0) {
      if (timeoutRef.current.courseName) {
        clearTimeout(timeoutRef.current.courseName);
      }
      // Delay sending data for 0.75 seconds in order to not send on every key press.
      timeoutRef.current.courseName = setTimeout(() => {
        const data = {
          courseName: course.courseName,
          courseID,
        };
        sendData(`${apiURL}/api/updateCourseName`, data);
      }, 0.75 * 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course.courseName]);

  /** Update the name of the chapter as you type. */
  useEffect(() => {
    if (countRef.current === 0) {
      if (timeoutRef.current.chapterName) {
        clearTimeout(timeoutRef.current.chapterName);
      }
      // Delay sending data for 0.75 seconds in order to not send on every key press.
      timeoutRef.current.chapterName = setTimeout(() => {
        const data = {
          chapterName: course.chapterName,
          chapterID,
          courseID,
        };
        sendData(`${apiURL}/api/updateChapterName`, data);
      }, 0.75 * 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course.chapterName]);

  const uploadCourseNameToDatabase = (): number => {
    // #################################################################################
    //                      If input field is empty, give a warning.
    // #################################################################################
    const pattern = /^[ ]*$/;
    if (course.courseName.length === 0 || pattern.test(course.courseName)) {
      setInputError((prevState) => {
        // eslint-disable-next-line no-param-reassign
        prevState.courseName = "Campul nu poate fi gol!"; //

        return { ...prevState };
      });

      return EXIT_FAILED; // Exit. Don't send data to database. The function caller doesn't use the value of 'EXIT_FAILED'. This is just a dummy to exit the function upon failed conditions.
    }
    // #################################################################################

    const data = {
      courseName: course.courseName,
      subjectID,
    };

    sendGetData(`${apiURL}/api/setCourseName`, data).then(
      (data_: any /* Set proper type interface after! */) => {
        if (data_.courseID === undefined) {
          console.log(
            "typescript data type is not {courseID: string}. Check 'SetCourseName.php' in Laravel controller"
          );
        } else {
          window.location.assign(
            `?courseID=${data_.courseID}&subjectID=${subjectID}`
          );
        }
      },
      (errorMsg) => {
        setNetworkError((prevState) => {
          // eslint-disable-next-line no-param-reassign
          prevState.courseName =
            "Numele cursului nu s-a putut stabili din cauza unei posibile probleme de retea. Verificati-va conexiunea la internet si incercati din nou!";

          return { ...prevState };
        });
        console.error("Error: ", errorMsg);
      }
    );

    return EXIT_SUCCESS; // The function caller doesn't use the value of 'EXIT_SUCCESS'. This is just a dummy.
  };

  const uploadChapterNameToDatabase = (): number => {
    /// #################################################################################
    //                      If input field is empty, give a warning.
    // #################################################################################
    const pattern = /^[ ]*$/;
    if (course.chapterName.length === 0 || pattern.test(course.chapterName)) {
      setInputError((prevState) => {
        // eslint-disable-next-line no-param-reassign
        prevState.chapterName = "Campul nu poate fi gol";

        return { ...prevState };
      });

      return EXIT_FAILED; // Exit. Don't send data to database.
    }
    // #################################################################################

    const data = {
      chapterName: course.chapterName,
      courseID,
      subjectID,
    };
    sendGetData(`${apiURL}/api/setChapterName`, data).then(
      (data_: any /* Set proper interface after */) => {
        if (data_.chapterID === undefined) {
          console.log(
            "typescript data type is not {courseID: string}. Check 'SetCourseName.php' in Laravel controller"
          );
        } else {
          window.location.assign(
            `?courseID=${data_.courseID}&chapterID=${data_.chapterID}&subjectID=${data_.subjectID}`
          );
        }
      },
      (errorMsg) => {
        setNetworkError((prevState) => {
          // eslint-disable-next-line no-param-reassign
          prevState.chapterName =
            "Numele cursului nu s-a putut stabili din cauza unei posibile probleme de retea. Verificati-va conexiunea la internet si incercati din nou!";

          return { ...prevState };
        });
        console.log("Error: ", errorMsg);
      }
    );

    return EXIT_SUCCESS;
  };

  return (
    <div className="chapterAndCourseNameInput-wrapper">
      <div className="chapterAndCourseNameInput">
        {visibility.courseName === true ? (
          <div>
            <label htmlFor="courseName">
              <span>Numele cursului:</span>
              <br />
              <textarea
                id="courseName"
                placeholder="Scrie aici numele cursului ..."
                value={course.courseName}
                onChange={(e): void => {
                  setCourse((prevState) => {
                    // eslint-disable-next-line no-param-reassign
                    prevState.courseName = e.target.value;
                    return { ...prevState };
                  });
                }}
              />
            </label>
            <div>{networkError.courseName}</div>
            {inputError.courseName.length !== 0 ? (
              <div>{inputError.courseName}</div>
            ) : (
              ""
            )}
            <br />
            <br />
          </div>
        ) : (
          ""
        )}
        {visibility.setCourseButton === true ? (
          <button type="button" onClick={uploadCourseNameToDatabase}>
            Seteaza Numele Cursului
          </button>
        ) : (
          ""
        )}
        {visibility.chapterName === true ? (
          <div>
            <label htmlFor="chapterName">
              <span>Numele capitolului:</span>
              <br />
              <textarea
                id="chapterName"
                placeholder="Scrie aici numele capitolului ..."
                value={course.chapterName}
                onChange={(e): void => {
                  setCourse((prevState) => {
                    // eslint-disable-next-line no-param-reassign
                    prevState.chapterName = e.target.value;
                    return { ...prevState };
                  });
                }}
              />
            </label>
            <div>{networkError.chapterName}</div>
            {inputError.chapterName.length !== 0 ? (
              <div>{inputError.chapterName}</div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        {visibility.setChapterButton === false ? (
          ""
        ) : (
          <button type="button" onClick={uploadChapterNameToDatabase}>
            Seteaza Numele Capitolului
          </button>
        )}
      </div>
    </div>
  );
}

export default ChapterAndCourseName;
