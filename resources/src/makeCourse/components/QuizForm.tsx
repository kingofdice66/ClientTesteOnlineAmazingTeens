import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import sendGetData from "../../customComponents/Fetch/sendGetData";
import sendData from "../../customComponents/Fetch/sendData";
import IOSSwitch from "../../customComponents/IOSSwitch/IOSSwitch";
import apiURL from "../../apiURL/ApiURL";
import "./QuizForm.scss";

interface IInputList {
    numberOfQuestions: number | string;
    data: Array<{
        question: string;
        numberOfAnswers: number | string; // Number of answerers per question.
        answers: Array<{ answer: string }>;
    }>;
}

interface ICorrectAnswers {
    question: number;
    answers: Array<{
        answer: number;
        value: boolean;
    }>;
}

interface IProps {
    urlIDs: { chapterID: number; courseID: number };
}

interface IData {
    question: string;
    numberOfAnswers: number | string; // Number of answerers per question.
    answers: Array<{ answer: string }>;
}

interface IAnswers {
    answer: string;
}

function QuizForm(props: IProps): JSX.Element {
    /**
     * This is used to prevent 'useEffect(()=> {...},[inputList])'
     * from updating data to the database too early.
     */
    const countRef = useRef<number>(2);
    const timeoutRef = useRef<NodeJS.Timeout>(null);
    const [inputList, setInputList] = useState<IInputList>({
        numberOfQuestions: 1,
        data: [
            {
                question: "",
                numberOfAnswers: 1, // Number of answerers per question.
                answers: [{ answer: "" }],
            },
        ],
    });
    /* Correct answers per given question. */
    const [correctAnswers, setCorrectAnswers] = useState<
        Array<ICorrectAnswers>
    >([
        {
            question: 0,
            answers: [{ answer: 0, value: false }],
        },
    ]);
    /**
     *  A temporary array for use in 'addNumberOfQuestions' function.
     *  'value' specifies the number of questions to be added.
     * 'data' specifies what 'inputList' specifies in the 'data' above.
     * */
    const [tempList, setTempList] = useState<any>({
        value: null,
        data: [],
    });
    /**
     * A temporary array for use in 'addNumberOfQuestions' function.
     * 'value' specifies the number of answers per questions.
     * 'answers' specifies what 'correctAnswers' specifies in 'answers' above.
     */
    const [tempCorrectAnswers, setTempCorrectAnswers] = useState<any>({
        value: null,
        answers: [],
    });

    const { urlIDs } = props; // In order to upload data to database in correct location.
    const { courseID, chapterID } = urlIDs;

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
        if (countRef.current !== 0) {
            countRef.current--;
            console.log("count: ", countRef.current);
        } else if (countRef.current === 0) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                const data = {
                    courseID,
                    chapterID,
                    quizForm: inputList,
                };
                sendData(`${apiURL}/api/updateQuizForm`, data);
                console.log("updated");
            }, 0.75 * 1000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputList]);

    /** Update correct answer in database. */
    useEffect(() => {
        console.log("correct answers updated");
    }, [correctAnswers]);

    /** Update question input a field as you type. */
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
        setInputList((prevState: any) => {
            // eslint-disable-next-line no-param-reassign
            prevState.data[parentIndex].answers[childIndex].answer = value;
            return { ...prevState };
        });
    };

    /** Append another question input field along with answers children and correct answers. */
    const addQuestion = (parentIndex: number): void => {
        setInputList((prevState: IInputList) => {
            prevState.data.push({
                question: "",
                numberOfAnswers: 1, // Number of answerers per question.
                answers: [{ answer: "" }],
            });
            return { ...prevState };
        });

        setCorrectAnswers((prevState: Array<ICorrectAnswers>) => {
            // eslint-disable-next-line no-param-reassign
            prevState.push({
                question: parentIndex + 1, // Plus once because it starts at 0.
                answers: [{ answer: 0, value: false }],
            });
            return [...prevState];
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

        setCorrectAnswers((prevState) => {
            prevState.splice(parentIndex, 1);
            return [...prevState];
        });
    };

    /** Append another answer to the question along with a correct answer. */
    const addAnswer = (parentIndex: number, childIndex: number): void => {
        setInputList((prevState: IInputList) => {
            prevState.data[parentIndex].answers.push({ answer: "" });
            return { ...prevState };
        });

        setCorrectAnswers((prevState) => {
            // eslint-disable-next-line no-param-reassign
            prevState[parentIndex].answers.push({
                answer: childIndex + 1, // Because is starts at 0.
                value: false,
            });

            return [...prevState];
        });
    };

    /** Remove an answer from the question along with the respective correct answer. */
    const removeAnswer = (parentIndex: number, childIndex: number): void => {
        setInputList((prevState: IInputList) => {
            prevState.data[parentIndex].answers.splice(childIndex, 1);
            return { ...prevState };
        });

        setCorrectAnswers((prevState) => {
            prevState[parentIndex].answers.splice(childIndex, 1);
            return [...prevState];
        });
    };

    /** Input field specifying the number of questions and a default answer and a default correct answer. */
    const addNumberOfQuestions = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const value = parseInt(e.target.value, 10);
        if (Number.isNaN(value) || value <= 0) {
            setTempList((prevState: any) => {
                // eslint-disable-next-line no-param-reassign
                prevState.value = "";
                return { ...prevState };
            });
            /* This is needed to set 'value' in the input tag. */
            setInputList((prevState: any) => {
                // eslint-disable-next-line no-param-reassign
                prevState.numberOfQuestions = "";
                return { ...prevState };
            });
        } else {
            setTempList((prevState: any) => {
                // eslint-disable-next-line no-param-reassign
                prevState.value = value;
                return { ...prevState };
            });
            /* This is needed to set 'value' in the input tag. */
            setInputList((prevState: any) => {
                // eslint-disable-next-line no-param-reassign
                prevState.numberOfQuestions = value;
                return { ...prevState };
            });
        }
    };

    /** Set the number of question when the user clicks the set number of questions button. */
    const setNumberOfQuestions = (): void => {
        if (tempList.value !== "" && tempList.value !== null) {
            const list: any = [];
            const corrAnswers: any = [];

            for (let i = 0; i < tempList.value; i++) {
                list.push({
                    question: "",
                    numberOfAnswers: 1, // Number of answerers per question.
                    answers: [{ answer: "" }],
                });

                corrAnswers.push({
                    question: i + 1, // Plus once because it starts at 0.
                    answers: [{ answer: 0, value: false }],
                });
            }

            setInputList((prevState: any) => {
                // eslint-disable-next-line no-param-reassign
                prevState.data = list;
                return { ...prevState };
            });

            setCorrectAnswers((prevState) => {
                // eslint-disable-next-line no-param-reassign
                prevState = corrAnswers;
                return [...prevState];
            });

            console.log("tempList.value: ", tempList.value);
            console.log("tempList.data: ", tempList.data);
        }
    };

    /** Input field specifying the number of answers per question along with the correct answers. */
    const addNumberOfAnswers = (
        e: React.ChangeEvent<HTMLInputElement>,
        parentIndex: number
    ): void => {
        const value = parseInt(e.target.value, 10);
        if (Number.isNaN(value) || value <= 0) {
            /** If the user erases everything in the input field. */
            setInputList((prevState: IInputList) => {
                // eslint-disable-next-line no-param-reassign
                prevState.data[parentIndex].numberOfAnswers = "";
                return { ...prevState };
            });
        } else {
            const list: Array<{ answer: "" }> = [];
            const corrAnswers: any = [];
            for (let i = 0; i < value; i++) {
                list.push({ answer: "" });
                corrAnswers.push({ answer: 0, value: false });
            }
            setInputList((prevState: IInputList) => {
                // eslint-disable-next-line no-param-reassign
                prevState.data[parentIndex].numberOfAnswers = value;
                // eslint-disable-next-line no-param-reassign
                prevState.data[parentIndex].answers = list;
                return { ...prevState };
            });

            setCorrectAnswers((prevState) => {
                // eslint-disable-next-line no-param-reassign
                prevState[parentIndex].answers = corrAnswers;
                return [...prevState];
            });
        }
    };

    const setNumberOfAnswers = (): void => {
        console.log("number of answers");
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
                                    addQuestion(i);
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
                            <>
                                <input
                                    type="text"
                                    maxLength={2}
                                    value={inputList.numberOfQuestions}
                                    onChange={(e): void =>
                                        addNumberOfQuestions(e)
                                    }
                                />
                                <span>
                                    <button
                                        type="button"
                                        onClick={setNumberOfQuestions}
                                    >
                                        Adaugă Întrebări
                                    </button>
                                </span>
                            </>
                        )}
                        {x.answers.map((y: IAnswers, j: number) => (
                            //! ATTENTION: Here we must use the index of the map as the key otherwise the form won't work as intended.
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={j}>
                                <label htmlFor={`answer${i}${j}`}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Răspunsul#
                                    {j + 1}: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                    <br />
                                    <IOSSwitch
                                        isON={
                                            correctAnswers[i].answers[j].value
                                        }
                                        onToggle={(): void =>
                                            setCorrectAnswers((prevState) => {
                                                // eslint-disable-next-line no-param-reassign
                                                prevState[i].answers[
                                                    j
                                                ].value = !prevState[i].answers[
                                                    j
                                                ].value;
                                                return [...prevState];
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
                                    onChange={(e): void =>
                                        updateAnswer(e, i, j)
                                    }
                                />

                                {x.answers.length - 1 === j && (
                                    <button
                                        type="button"
                                        onClick={(): void => {
                                            addAnswer(i, j);
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
                                    <>
                                        <input
                                            type="text"
                                            value={x.numberOfAnswers}
                                            onChange={(e): void =>
                                                addNumberOfAnswers(e, i)
                                            }
                                        />
                                        <span>
                                            <button
                                                type="button"
                                                onClick={setNumberOfAnswers}
                                            >
                                                Adaugă Răspunsuri
                                            </button>
                                        </span>
                                    </>
                                )}
                            </div>
                        ))}
                        <br />
                        <br />
                    </div>
                ))}
            </div>
            {/* {JSON.stringify(inputList, null, 2)} */}
            {JSON.stringify(correctAnswers, null, 2)}
        </>
    );
}

export default QuizForm;
