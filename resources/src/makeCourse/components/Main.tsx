import React, { useState, useEffect } from "react";
import ChapterAndCourseName from "./ChapterAndCourseName";
import QuizForm from "./QuizForm";
import TinyMCE from "./TinyMCE";
import sendGetData from "../../fetch/sendGetData";
import apiURL from "../../apiURL/ApiURL";
import "./Main.scss";

// ----------------------------------------------------------------
//                 Get url parameters.
const url: string = window.location.search;
const searchParams: URLSearchParams = new URLSearchParams(url);
const courseID: number = parseInt(searchParams.get("courseID"), 10);
// ----------------------------------------------------------------

interface IVisibility {
    courseName: boolean;
    chapterName: boolean;
    quizFormAndTextEditor: boolean;
    setCourseButton: boolean;
    setChapterButton: boolean;
}

function MakeCourseForm(): JSX.Element {
    const [visibility, setVisibility] = useState<IVisibility>({
        courseName: true, // This is hidden only when the name of the course is set.
        chapterName: false, // Visible only if the name fo the course is set.
        quizFormAndTextEditor: false, // Visible only if the name of the chapter is set.
        setCourseButton: true, // Visible only if the course is not set.
        setChapterButton: false, // Visible only if the chapter is not set.
    });

    const [courseName, setCourseName] = useState<string>("");
    // This 'errorChapterName' is for when there is some sort of error with the network when we set the name of the course.
    const [errorChapterName, setErrorChapterName] = useState<string>("");
    const [courseChapterName, setCourseChapterName] = useState<string>("");

    useEffect(() => {
        if (courseID) {
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
            setErrorChapterName("");
        } else {
            console.log("failed");
        }
    }, []);

    const uploadCourseNameToDatabase = (): void => {
        sendGetData(`${apiURL}/api/setCourseName`, courseName).then(
            (data: { id: string }) => {
                if (data.id === undefined) {
                    console.log(
                        "typescript data type is not {id: string}. Check 'SetCourseName.php' in Laravel controller"
                    );
                } else {
                    const { id } = data; // The id of the recently created course.
                    window.location.assign(
                        `${apiURL}/MakeCourse?courseID=${id}`
                    );
                }
            },
            (error) => {
                setErrorChapterName(
                    "Numele cursului nu s-a putut stabili din cauza unei posibile probleme de retea. Verificati-va conexiunea la internet si incercati din nou!"
                );
                console.error("Error: ", error);
            }
        );
    };

    const uploadChapterNameToDatabase = (): void => {
        setVisibility((prevState) => {
            // eslint-disable-next-line no-param-reassign
            prevState.quizFormAndTextEditor = true;
            // eslint-disable-next-line no-param-reassign
            prevState.chapterName = false;
            return { ...prevState };
        });
        console.log("SUCCESS");
    };

    return (
        <>
            <div className="makeCourseForm-wrapper">
                <ChapterAndCourseName
                    visibility={visibility}
                    //-------------------------------
                    //   Pass the whole state.
                    courseName={courseName}
                    setCourseName={setCourseName}
                    //-------------------------------
                />
                <div>{errorChapterName}</div>
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
