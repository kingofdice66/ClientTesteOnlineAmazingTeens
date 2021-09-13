import React, { useState, useEffect } from "react";
import ChapterAndCourseName from "./ChapterAndCourseName";
import QuizForm from "./QuizForm";
import TinyMCE from "./TinyMCE";
import sendGetData from "../../fetch/sendGetData";
import apiURL from "../../apiURL/ApiURL";
import "./Main.scss";

// ####################################################################
//                 Get url parameters.
const url: string = window.location.search;
const searchParams: URLSearchParams = new URLSearchParams(url);
const courseID: number = parseInt(searchParams.get("courseID"), 10);
const chapterID: number = parseInt(searchParams.get("chapterID"), 10);
// ####################################################################

interface IVisibility {
    courseName: boolean;
    chapterName: boolean;
    quizFormAndTextEditor: boolean;
    setCourseButton: boolean;
    setChapterButton: boolean;
}

interface ICourse {
    courseName: string;
    chapterName: string;
}

interface IChapter {
    name: string;
    courseID: number;
}

interface IError {
    courseName: string;
    chapterName: string;
}

function MakeCourseForm(): JSX.Element {
    const [visibility, setVisibility] = useState<IVisibility>({
        courseName: true, // This is hidden only when the name of the course is set.
        chapterName: false, // Visible only if the name fo the course is set.
        quizFormAndTextEditor: false, // Visible only if the name of the chapter is set.
        setCourseButton: true, // Visible only if the course is not set.
        setChapterButton: false, // Visible only if the chapter is not set.
    });

    const [course, setCourse] = useState<ICourse>({
        courseName: "",
        chapterName: "",
    });

    // This 'errorChapterName' is for when there is some sort of error with the network when we set the name of the course.
    const [error, setError] = useState<IError>({
        courseName: "",
        chapterName: "",
    });

    // To be called once when page loads.
    useEffect(() => {
        // If 'courseID' is set but not 'chapterID' means that the name of the course is set but not the chapter name.
        if (!Number.isNaN(courseID) && Number.isNaN(chapterID)) {
            setVisibility((prevState) => {
                // eslint-disable-next-line no-param-reassign
                prevState.chapterName = true;
                // eslint-disable-next-line no-param-reassign
                prevState.setCourseButton = false;
                // eslint-disable-next-line no-param-reassign
                prevState.setChapterButton = true;
                // eslint-disable-next-line no-param-reassign
                prevState.courseName = false;
                return { ...prevState };
            });
            setError({ ...error, courseName: "" });
            // If both 'courseID' and 'chapterID' are set means that both course name and chapter name are set.
        } else if (!Number.isNaN(courseID) && !Number.isNaN(chapterID)) {
            setVisibility((prevState) => {
                // eslint-disable-next-line no-param-reassign
                prevState.chapterName = true;
                // eslint-disable-next-line no-param-reassign
                prevState.courseName = true;
                // eslint-disable-next-line no-param-reassign
                prevState.setChapterButton = false;
                // eslint-disable-next-line no-param-reassign
                prevState.setCourseButton = false;
                // eslint-disable-next-line no-param-reassign
                prevState.quizFormAndTextEditor = true;
                return { ...prevState };
            });
        } else {
            console.log("Conditions failed in 'useEffect()'");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /** Upload course name to the database. */
    const uploadCourseNameToDatabase = (): void => {
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
                setError({
                    ...error,
                    courseName:
                        "Numele cursului nu s-a putut stabili din cauza unei posibile probleme de retea. Verificati-va conexiunea la internet si incercati din nou!",
                });
                console.error("Error: ", errorMsg);
            }
        );
    };

    /** Upload chapter name to the database. */
    const uploadChapterNameToDatabase = (): void => {
        const data: IChapter = {
            name: course.chapterName,
            courseID, // The new chapter must be associated with the proper course.
        };
        sendGetData(`${apiURL}/api/setChapterName`, data).then(
            (item: any /* Set proper type interface after */) => {
                if (item.chapterID === undefined) {
                    console.log(
                        "typescript data type is not {chapterID: string}. Check 'SetChapterName.php' in Laravel controller"
                    );
                } else {
                    window.location.assign(
                        `${apiURL}/MakeCourse?courseID=${item.courseID}&chapterID=${item.chapterID}`
                    );
                }
            },
            (errorMsg) => {
                setError({
                    ...error,
                    chapterName:
                        "Numele cursului nu s-a putut stabili din cauza unei posibile probleme de retea. Verificati-va conexiunea la internet si incercati din nou!",
                });
                console.log("Error: ", errorMsg);
            }
        );
        setVisibility((prevState) => {
            // eslint-disable-next-line no-param-reassign
            prevState.quizFormAndTextEditor = true;
            // eslint-disable-next-line no-param-reassign
            prevState.chapterName = false;
            return { ...prevState };
        });
    };

    return (
        <>
            <div className="makeCourseForm-wrapper">
                <ChapterAndCourseName
                    visibility={visibility}
                    // ################################
                    //   Pass the course state.
                    course={course}
                    setCourse={setCourse}
                    // ################################
                />
                <div>{error.chapterName}</div>
                {visibility.setCourseButton === true ? (
                    <button type="button" onClick={uploadCourseNameToDatabase}>
                        Seteaza Numele Cursului
                    </button>
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
                {visibility.quizFormAndTextEditor === true ? (
                    <>
                        <QuizForm />
                        <br />
                        <br />
                        <span>Conținutul capitolului</span>
                        <br />
                        <TinyMCE />
                        <br />
                        <br />
                    </>
                ) : (
                    ""
                )}
            </div>
        </>
    );
}

export default MakeCourseForm;
