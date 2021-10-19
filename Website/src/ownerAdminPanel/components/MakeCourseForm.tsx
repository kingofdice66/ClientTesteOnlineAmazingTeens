import React, { useEffect, useState } from "react";
import ChapterAndCourseName from "./ChapterAndCourseName";
import QuizForm from "./QuizForm";
import TinyMCE from "./TinyMCE";
import "./MakeCourseForm.scss";

interface IUrlIDs {
  chapterID: number;
  courseID: number;
  subjectID: number;
}

interface IVisibility {
  quizFormAndTextEditor: boolean;
}

function MakeCourseForm(props: any): JSX.Element {
  const { courseID, chapterID, subjectID } = props;

  const [visibility, setVisibility] = useState<IVisibility>({
    quizFormAndTextEditor: false,
  });
  const urlIDs: IUrlIDs = {
    courseID: ((): number => {
      if (!Number.isNaN(courseID)) {
        return courseID;
      }
      return null;
    })(),
    chapterID: ((): number => {
      if (!Number.isNaN(chapterID)) {
        return chapterID;
      }
      return null;
    })(),
    subjectID: ((): number => {
      if (!Number.isNaN(subjectID)) {
        return subjectID;
      }
      return null;
    })(),
  };

  // To be run only once on page load.
  useEffect(() => {
    if (urlIDs.courseID !== null && urlIDs.chapterID !== null) {
      setVisibility((prevState) => {
        // eslint-disable-next-line no-param-reassign
        prevState.quizFormAndTextEditor = true;
        return { ...prevState };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="makeCourseForm-wrapper">
        <ChapterAndCourseName urlIDs={urlIDs} />
        {visibility.quizFormAndTextEditor === true ? (
          <>
            <QuizForm urlIDs={urlIDs} />
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
