import React, { useState, useEffect, useRef } from "react";
import sendGetData from "../../fetch/sendGetData";
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

interface IData {
    question: string;
    numberOfAnswers: number | string; // Number of answerers per question.
    answers: Array<{ answer: string }>;
}

interface IAnswers {
    answer: string;
}

function QuizForm(): JSX.Element {
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

    /** Get data from the database. Run once on page load. */
    useEffect(() => {
        // sendGetData(`${apiURL}/api/`).then();
    }, []);

    /** Update changes to the quiz form when it changes. */
    useEffect(() => {
        // console.log("inputList updated");
    }, [inputList]);

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

    /** Append another question input field along with answers children. */
    const addQuestion = (): void => {
        setInputList((prevState: IInputList) => {
            prevState.data.push({
                question: "",
                numberOfAnswers: 1, // Number of answerers per question.
                answers: [{ answer: "" }],
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

    /** Remove question input field along with answers children. */
    const removeQuestion = (parentIndex: number): void => {
        setInputList((prevState: IInputList) => {
            prevState.data.splice(parentIndex, 1);
            return { ...prevState };
        });
    };

    /** Append another answer to the question */
    const addAnswer = (parentIndex: number): void => {
        setInputList((prevState: IInputList) => {
            prevState.data[parentIndex].answers.push({ answer: "" });
            return { ...prevState };
        });
    };

    /** Remove an answer from the question. */
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
                    numberOfAnswers: 1, // Number of answerers per question.
                    answers: [{ answer: "" }],
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
            for (let i = 0; i < value; i++) {
                list.push({ answer: "" });
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
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={j}>
                                <label htmlFor={`answer${i}${j}`}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Răspunsul#{j}
                                    :
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                    <input
                                        type="text"
                                        id={`answer${i}${j}`}
                                        value={y.answer}
                                        onChange={(e): void =>
                                            updateAnswer(e, i, j)
                                        }
                                    />
                                </label>
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
                                        onChange={(e): void =>
                                            addNumberOfAnswers(e, i)
                                        }
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {JSON.stringify(inputList, null, 2)}
        </>
    );
}

export default QuizForm;
