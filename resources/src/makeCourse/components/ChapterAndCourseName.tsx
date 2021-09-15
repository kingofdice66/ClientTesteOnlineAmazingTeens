import React from "react";
import "./ChapterAndCourseName.scss";

interface ICourse {
    courseName: string;
    chapterName: string;
}

interface IProps {
    visibility: { courseName: boolean; chapterName: boolean };
    course: { courseName: string; chapterName: string };
    setCourse: React.Dispatch<React.SetStateAction<ICourse>>;
    inputError: { chapterName: string; courseName: string };
    urlIDs: { chapterID: number; courseID: number };
}

function ChapterAndCourseName(props: IProps): JSX.Element {
    const { visibility } = props; // Some parts are visible depending on how chapter and course names are set.
    const { course, setCourse } = props; // course state.
    const { inputError } = props;
    const { urlIDs } = props; // In order to upload data to database in correct location.

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
                                onChange={(e): void =>
                                    setCourse({
                                        ...course,
                                        courseName: e.target.value,
                                    })
                                }
                            />
                        </label>
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
                {visibility.chapterName === true ? (
                    <div>
                        <label htmlFor="chapterName">
                            <span>Numele capitolului:</span>
                            <br />
                            <textarea
                                id="chapterName"
                                placeholder="Scrie aici numele capitolului ..."
                                value={course.chapterName}
                                onChange={(e): void =>
                                    setCourse({
                                        ...course,
                                        chapterName: e.target.value,
                                    })
                                }
                            />
                        </label>
                        {inputError.chapterName.length !== 0 ? (
                            <div>{inputError.chapterName}</div>
                        ) : (
                            ""
                        )}
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default ChapterAndCourseName;
