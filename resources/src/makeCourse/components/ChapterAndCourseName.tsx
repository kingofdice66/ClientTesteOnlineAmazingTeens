import React, { useState, useEffect } from "react";
import apiURL from "../../apiURL/ApiURL";
import sendGetData from "../../fetch/sendGetData";
import "./ChapterAndCourseName.scss";

const EXIT_SUCCESS = 0;
const EXIT_FAILED = 1;

interface ICourse {
    courseName: string;
    chapterName: string;
}

interface IProps {
    urlIDs: { chapterID: number; courseID: number };
}

interface IVisibility {
    courseName: boolean;
    chapterName: boolean;
    setCourseButton: boolean;
    setChapterButton: boolean;
}

interface IInputError {
    courseName: string;
    chapterName: string;
}

type INetworkError = IInputError;

function ChapterAndCourseName(props: IProps): JSX.Element {
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
    const { courseID, chapterID } = urlIDs;

    const setVisibilityFunction = (): void => {
        // If 'courseID' is set but not 'chapterID' means that the name of the course is set but not the chapter name.
        if (chapterID !== null && chapterID === null) {
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
        } else {
            console.log("Condition failed in 'useEffect()' visibility");
        }
    };

    // To be called once when the page loads.
    useEffect(() => {
        setVisibilityFunction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /** Update the name of the course as you type. */
    useEffect(() => {
        // const data = {
        //     courseName: course.courseName,
        //     courseID: urlIDsRef.courseID,
        // };
        // sendData(`${apiURL}/api/updateCourseName`, data);
        console.log("course name updated");
    }, [course.courseName]);

    /** Update the name of the chapter as you type. */
    useEffect(() => {
        console.log("chapter name updated");
    }, [course.chapterName]);

    /** Update the name of the chapter as you type. */
    // const updateChapterNameInDatabase = (): void => {
    //     const data = {
    //         chapterName: course.chapterName,
    //         chapterID: urlIDsRef.chapterID,
    //         courseID: urlIDsRef.courseID,
    //     };
    //     sendData(`${apiURL}/api/updateChapterName`, data);
    // };

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

            return EXIT_FAILED; // Exit. Don't send data to database.
        }
        // #################################################################################

        sendGetData(`${apiURL}/api/setCourseName`, course.courseName).then(
            (item: any /* Set proper type interface after! */) => {
                if (item.courseID === undefined) {
                    console.log(
                        "typescript data type is not {courseID: string}. Check 'SetCourseName.php' in Laravel controller"
                    );
                } else {
                    window.location.assign(
                        `${apiURL}/MakeCourse?courseID=${item.courseID}`
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

        return EXIT_SUCCESS;
    };

    const uploadChapterNameToDatabase = (): number => {
        /// #################################################################################
        //                      If input field is empty, give a warning.
        // #################################################################################
        const pattern = /^[ ]*$/;
        if (
            course.chapterName.length === 0 ||
            pattern.test(course.chapterName)
        ) {
            setInputError((prevState) => {
                // eslint-disable-next-line no-param-reassign
                prevState.chapterName = "Campul nu poate fi gol";

                return { ...prevState };
            });

            return EXIT_FAILED; // Exit. Don't send data to database.
        }
        // #################################################################################

        sendGetData(`${apiURL}/api/SetChapterName`, course.chapterName).then(
            (item: any /* Set proper interface after */) => {
                if (item.chapterID === undefined) {
                    console.log(
                        "typescript data type is not {courseID: string}. Check 'SetCourseName.php' in Laravel controller"
                    );
                } else {
                    window.location.assign(
                        `${apiURL}/MakeCourse?courseID=${item.courseID}&chapterID=${item.chapterID}`
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
        setVisibility((prevState) => {
            // eslint-disable-next-line no-param-reassign
            prevState.chapterName = false;

            return { ...prevState };
        });

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
