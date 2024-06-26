import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import IOSSwitch from "../../CustomComponents/IOSSwitch/IOSSwitch";
import apiURL from "../../ApiURL/ApiURL";
import "./SetQuizzes.module.scss";

interface IInputList {
  numberOfQuestions: number | string;
  data: Array<{
    question: string;
    points: number; // How many points the question is worth if answered correctly.
    numberOfAnswers: number | string; // Number of answerers per question.
    answers: Array<{ answer: string; value: boolean }>; // 'value' specifies if the answer is correct or not.
  }>;
}

interface IData {
  question: string;
  points: number; // How many points the question is worth if answered correctly.
  numberOfAnswers: number | string; // Number of answerers per question.
  answers: Array<{ answer: string; value: boolean }>; // 'value' specifies if the answer is correct or not.
}

interface IAnswers {
  answer: string;
  value: false;
}

function SetQuizzes(): JSX.Element {
  const router = useRouter();
  const { subjectId, courseId, chapterId } = router.query;

  /**
   * This is used to prevent 'useEffect(()=> {...},[inputList])'
   * from updating data to the database too early.
   */
  const countRef = useRef<number>(2);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [quiz, setQuiz] = useState<IInputList>({
    numberOfQuestions: 1,
    data: [
      {
        question: "",
        points: 1, // How many points the question is worth if answered correctly.
        numberOfAnswers: 1, // Number of answerers per question.
        answers: [{ answer: "", value: false }], // 'value' specifies if the answer is correct or not.
      },
    ],
  });

  /** Get data from the database. Run once on page load. */
  useEffect(() => {
    axios
      .post(`${apiURL}/getQuizzes`, { subjectId, courseId, chapterId })
      .then((data: any) => {
        console.log("quiz data on page load: ", data.data);
        if (data.data) setQuiz(data.data);
      })
      .catch((err: any) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Count countRef to 0 first in order for 'useEffect(()=>{...},[quiz])'
   * to not send data to the database too early because 'quiz' state will update
   * immediately causing 'useEffect' to be called which it is not desired on the first go.
   * */
  useEffect(() => {
    if (countRef.current !== 0) {
      countRef.current--;
    }
  }, [quiz]);

  /** Update quiz to database as you make modifications . */
  useEffect(() => {
    if (countRef.current === 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Delay sending data for 0.75 seconds in order to not send on every key press.
      timeoutRef.current = setTimeout(() => {
        const quizStringified = JSON.stringify(quiz); // Turn object into a string.

        // prettier-ignore
        axios
          .post(`${apiURL}/updateQuizzes`, { subjectId, courseId, chapterId, quizStringified })
          .then((data: any) => console.log("quiz on type: ", data))
          .catch((err: any) => console.error(err));
      }, 0.75 * 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz]);

  /** Update question input field as you type. */
  const updateQuestion = (
    e: React.ChangeEvent<HTMLInputElement>,
    parentIndex: number
  ): void => {
    const { value } = e.target;
    setQuiz((prevState: IInputList) => {
      // eslint-disable-next-line no-param-reassign
      prevState.data[parentIndex].question = value;
      return { ...prevState };
    });
  };

  /** Update answer input field as you type. */
  const updateAnswer = (
    e: React.ChangeEvent<HTMLInputElement>,
    parentIndex: number,
    childIndex: number
  ): void => {
    const { value } = e.target;
    setQuiz((prevState: IInputList) => {
      // eslint-disable-next-line no-param-reassign
      prevState.data[parentIndex].answers[childIndex].answer = value;
      return { ...prevState };
    });
  };

  /** Append another question input field along with answers children and correct answers. */
  const addQuestion = (): void => {
    setQuiz((prevState: IInputList) => {
      prevState.data.push({
        question: "",
        points: 1, // How many points the question is worth if answered correctly.
        numberOfAnswers: 1, // Number of answerers per question.
        answers: [{ answer: "", value: false }], // 'value' specifies if the answer is correct or not.
      });
      return { ...prevState };
    });
    console.log("question added");
  };

  /**
   * When user clicks the + or - (add or remove questions), the input field
   * specifying how many questions specified by a number will be emptied.
   * */
  const eraseNumberOfQuestionsInputField = (): void => {
    setQuiz((prevState: IInputList) => {
      // eslint-disable-next-line no-param-reassign
      prevState.numberOfQuestions = "";
      return { ...prevState };
    });
  };

  /** Remove question input field along with answers children and correct answers. */
  const removeQuestion = (parentIndex: number): void => {
    setQuiz((prevState: IInputList) => {
      prevState.data.splice(parentIndex, 1);
      return { ...prevState };
    });
  };

  /** Append another answer to the question along with a correct answer. */
  const addAnswer = (parentIndex: number): void => {
    setQuiz((prevState: IInputList) => {
      prevState.data[parentIndex].answers.push({
        answer: "",
        value: false,
      });
      return { ...prevState };
    });
  };

  /** Remove an answer from the question along with the respective correct answer. */
  const removeAnswer = (parentIndex: number, childIndex: number): void => {
    setQuiz((prevState: IInputList) => {
      prevState.data[parentIndex].answers.splice(childIndex, 1);
      return { ...prevState };
    });
  };

  /** Input field specifying the number of questions. */
  const addNumberOfQuestions = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = parseInt(e.target.value, 10);
    const list: Array<IData> = [];

    if (Number.isNaN(value) || value <= 0) {
      /** If user erases everything in the input field. */
      setQuiz((prevState: IInputList) => {
        // eslint-disable-next-line no-param-reassign
        prevState.numberOfQuestions = "";
        return { ...prevState };
      });
    } else {
      for (let i = 0; i < value; i++) {
        list.push({
          question: "",
          points: 1,
          numberOfAnswers: 1, // Number of answerers per question.
          answers: [{ answer: "", value: false }],
        });
      }
      setQuiz((prevState: IInputList) => {
        // eslint-disable-next-line no-param-reassign
        prevState.data = list;
        // eslint-disable-next-line no-param-reassign
        prevState.numberOfQuestions = value;
        return { ...prevState };
      });
    }
  };

  /** Input field specifying the number of answers per question. */
  const addNumberOfAnswers = (
    e: React.ChangeEvent<HTMLInputElement>,
    parentIndex: number
  ): void => {
    const list: Array<IAnswers> = [];
    const value = parseInt(e.target.value, 10);

    if (Number.isNaN(value) || value <= 0) {
      /** If the user erases everything in the input field. */
      setQuiz((prevState: IInputList) => {
        // eslint-disable-next-line no-param-reassign
        prevState.data[parentIndex].numberOfAnswers = "";
        return { ...prevState };
      });
    } else {
      for (let i = 0; i < value; i++) {
        list.push({ answer: "", value: false });
      }
      setQuiz((prevState: IInputList) => {
        // eslint-disable-next-line no-param-reassign
        prevState.data[parentIndex].numberOfAnswers = value;
        // eslint-disable-next-line no-param-reassign
        prevState.data[parentIndex].answers = list;
        return { ...prevState };
      });
    }
  };

  /**
   * When user clicks the + or - (add or remove answers), the input field
   * specifying how many answers per question specified by a number will be emptied.
   * */
  const eraseNumberOfAnswersInputField = (parentIndex: number): void => {
    setQuiz((prevState: IInputList) => {
      // eslint-disable-next-line no-param-reassign
      prevState.data[parentIndex].numberOfAnswers = "";
      return { ...prevState };
    });
  };

  return (
    <>
      <div className="quizForm">
        {quiz.data.map((x: IData, i: number) => (
          //! ATTENTION: Here we must use the index of the map as the key otherwise the form won't work as intended.
          // eslint-disable-next-line react/no-array-index-key
          <div key={i}>
            <input type="text" placeholder="puncte..." />

            <label htmlFor={`question${i}`}>
              Întrebarea#{i + 1}:<br />
              <input
                type="text"
                id={`question${i}`}
                value={x.question}
                onChange={(e): void => updateQuestion(e, i)}
              />
            </label>

            {quiz.data.length - 1 === i && (
              <button
                type="button"
                onClick={(): void => {
                  addQuestion();
                  eraseNumberOfQuestionsInputField();
                }}
              >
                +
              </button>
            )}
            {quiz.data.length - 1 !== 0 && (
              <button
                type="button"
                onClick={(): void => {
                  removeQuestion(i);
                  eraseNumberOfQuestionsInputField();
                }}
              >
                -
              </button>
            )}
            {i === 0 && (
              <input
                type="text"
                value={quiz.numberOfQuestions}
                onChange={(e): void => addNumberOfQuestions(e)}
              />
            )}
            {x.answers.map(
              (y: any /*! To be changed later in 'interface' */, j: number) => (
                //! ATTENTION: Here we must use the index of the map as the key otherwise the form won't work as intended.
                // eslint-disable-next-line react/no-array-index-key
                <div key={j}>
                  <label htmlFor={`answer${i}${j}`}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Răspunsul#
                    {j + 1}: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br />
                    <IOSSwitch
                      isON={quiz.data[i].answers[j].value}
                      onToggle={(): void =>
                        setQuiz((prevState) => {
                          // prettier-ignore
                          // eslint-disable-next-line no-param-reassign
                          prevState.data[i].answers[j].value = !prevState.data[i].answers[j].value;
                          return { ...prevState };
                        })
                      }
                      ONColor="green"
                      OFFColor="#baa6ee"
                    />
                  </label>

                  <input
                    type="text"
                    id={`answer${i}${j}`}
                    value={y.answer}
                    onChange={(e): void => updateAnswer(e, i, j)}
                  />

                  {x.answers.length - 1 === j && (
                    <button
                      type="button"
                      onClick={(): void => {
                        addAnswer(i);
                        eraseNumberOfAnswersInputField(i);
                      }}
                    >
                      +
                    </button>
                  )}

                  {x.answers.length - 1 !== 0 && (
                    <button
                      type="button"
                      onClick={(): void => {
                        removeAnswer(i, j);
                        eraseNumberOfAnswersInputField(i);
                      }}
                    >
                      -
                    </button>
                  )}

                  {j === 0 && (
                    <input
                      type="text"
                      value={x.numberOfAnswers}
                      onChange={(e): void => addNumberOfAnswers(e, i)}
                    />
                  )}
                </div>
              )
            )}
            <br />
            <br />
          </div>
        ))}
      </div>
      {JSON.stringify(quiz, null, 2)}
    </>
  );
}

export default SetQuizzes;
