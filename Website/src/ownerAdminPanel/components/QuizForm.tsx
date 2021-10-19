import React, { useState, useEffect, useRef } from "react";
import sendGetData from "../../customComponents/Fetch/sendGetData";
import sendData from "../../customComponents/Fetch/sendData";
import IOSSwitch from "../../customComponents/IOSSwitch/IOSSwitch";
import apiURL from "../../apiURL/ApiURL";
import "./QuizForm.scss";

interface IInputList {
  numberOfQuestions: number | string;
  data: Array<{
    question: string;
    points: number; // How many points the question is worth if answered correctly.
    numberOfAnswers: number | string; // Number of answerers per question.
    answers: Array<{ answer: string; value: boolean }>; // 'value' specifies if the answer is correct or not.
  }>;
}

// For a temporary constant.
interface IProps {
  urlIDs: { chapterID: number; courseID: number };
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

function QuizForm(props: IProps): JSX.Element {
  const { urlIDs } = props; // In order to upload data to database in correct location.
  const { courseID, chapterID } = urlIDs;

  /**
   * This is used to prevent 'useEffect(()=> {...},[inputList])'
   * from updating data to the database too early.
   */
  const countInputListRef = useRef<number>(2);
  const timeoutInputListRef = useRef<NodeJS.Timeout>(null);
  const [inputList, setInputList] = useState<IInputList>({
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
    sendGetData(`${apiURL}/api/getQuizForm`, urlIDs).then(
      (data: any /* To be set at a later time. */) => {
        if (data.quizForm !== null) {
          setInputList(JSON.parse(data.quizForm));
        }
      },
      (errorMsg) => {
        console.log("Error: ", errorMsg);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Count countRef to 0 first in order for 'useEffect(()=>{...},[inputList])'
   * to not send data to the database too early because 'inputList' state will update
   * immediately causing 'useEffect' to be called which it is not desired on the first go.
   * Then send data to the database.
   * */
  useEffect(() => {
    if (countInputListRef.current !== 0) {
      countInputListRef.current--;
    } else if (countInputListRef.current === 0) {
      if (timeoutInputListRef.current) {
        clearTimeout(timeoutInputListRef.current);
      }
      timeoutInputListRef.current = setTimeout(() => {
        const data = {
          courseID,
          chapterID,
          quizForm: inputList,
        };
        sendData(`${apiURL}/api/updateQuizForm`, data);
        // console.log("updated");
      }, 0.75 * 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputList]);

  /** Update correct answer in database. */

  /** Update question input field as you type. */
  const updateQuestion = (
    e: React.ChangeEvent<HTMLInputElement>,
    parentIndex: number
  ): void => {
    const { value } = e.target;
    setInputList((prevState: IInputList) => {
      // eslint-disable-next-line no-param-reassign
      prevState.data[parentIndex].question = value;
      return { ...prevState };
    });
  };

  /** Update answer input field as you type.  */
  const updateAnswer = (
    e: React.ChangeEvent<HTMLInputElement>,
    parentIndex: number,
    childIndex: number
  ): void => {
    const { value } = e.target;
    setInputList((prevState: IInputList) => {
      // eslint-disable-next-line no-param-reassign
      prevState.data[parentIndex].answers[childIndex].answer = value;
      return { ...prevState };
    });
  };

  /** Append another question input field along with answers children and correct answers. */
  const addQuestion = (): void => {
    setInputList((prevState: IInputList) => {
      prevState.data.push({
        question: "",
        points: 1, // How many points the question is worth if answered correctly.
        numberOfAnswers: 1, // Number of answerers per question.
        answers: [{ answer: "", value: false }], // 'value' specifies if the answer is correct or not.
      });
      return { ...prevState };
    });
  };

  /**
   * When user clicks the + or - (add or remove questions), the input field
   * specifying how many questions specified by a number will be emptied.
   * */
  const eraseNumberOfQuestionsInputField = (): void => {
    setInputList((prevState: IInputList) => {
      // eslint-disable-next-line no-param-reassign
      prevState.numberOfQuestions = "";
      return { ...prevState };
    });
  };

  /** Remove question input field along with answers children and correct answers. */
  const removeQuestion = (parentIndex: number): void => {
    setInputList((prevState: IInputList) => {
      prevState.data.splice(parentIndex, 1);
      return { ...prevState };
    });
  };

  /** Append another answer to the question along with a correct answer. */
  const addAnswer = (parentIndex: number): void => {
    setInputList((prevState: IInputList) => {
      prevState.data[parentIndex].answers.push({
        answer: "",
        value: false,
      });
      return { ...prevState };
    });
  };

  /** Remove an answer from the question along with the respective correct answer. */
  const removeAnswer = (parentIndex: number, childIndex: number): void => {
    setInputList((prevState: IInputList) => {
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
      setInputList((prevState: IInputList) => {
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
      setInputList((prevState: IInputList) => {
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
      setInputList((prevState: IInputList) => {
        // eslint-disable-next-line no-param-reassign
        prevState.data[parentIndex].numberOfAnswers = "";
        return { ...prevState };
      });
    } else {
      for (let i = 0; i < value; i++) {
        list.push({ answer: "", value: false });
      }
      setInputList((prevState: IInputList) => {
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
    setInputList((prevState: IInputList) => {
      // eslint-disable-next-line no-param-reassign
      prevState.data[parentIndex].numberOfAnswers = "";
      return { ...prevState };
    });
  };

  return (
    <>
      <div className="quizForm">
        {inputList.data.map((x: IData, i: number) => (
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

            {inputList.data.length - 1 === i && (
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
            {inputList.data.length - 1 !== 0 && (
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
                value={inputList.numberOfQuestions}
                onChange={(e): void => addNumberOfQuestions(e)}
              />
            )}
            {x.answers.map((y: IAnswers, j: number) => (
              //! ATTENTION: Here we must use the index of the map as the key otherwise the form won't work as intended.
              // eslint-disable-next-line react/no-array-index-key
              <div key={j}>
                <label htmlFor={`answer${i}${j}`}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Răspunsul#
                  {j + 1}: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br />
                  <IOSSwitch
                    isON={inputList.data[i].answers[j].value}
                    onToggle={(): void =>
                      setInputList((prevState) => {
                        // eslint-disable-next-line no-param-reassign
                        prevState.data[i].answers[j].value = !prevState.data[i]
                          .answers[j].value;
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
            ))}
            <br />
            <br />
          </div>
        ))}
      </div>
      {JSON.stringify(inputList, null, 2)}
    </>
  );
}

export default QuizForm;
