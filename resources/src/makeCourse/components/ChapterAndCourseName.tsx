import React from "react";
import "./ChapterAndCourseName.scss";

function ChapterAndCourseName(props: any): JSX.Element {
    const { visibility } = props; // Some parts are visible only when the name of the course is set.
    const { courseName, setCourseName } = props; // Passed the whole state.

    const setCourseNameOnChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ): void => {
        setCourseName(e.target.value);
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
                                value={courseName}
                                onChange={setCourseNameOnChange}
                            />
                        </label>
                        <br />
                        <br />
                    </div>
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
                            />
                        </label>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default ChapterAndCourseName;
