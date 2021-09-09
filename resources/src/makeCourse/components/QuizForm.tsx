import React, { useState, useReducer, useRef } from "react";

interface IInputList {
    numberOfQuestions: number | string;
    data: Array<{
        question: string;
        numberOfAnswers: number | string; // Number of answerers per question.
        answers: Array<{ answer: string }>;
    }>;
}

function QuizForm(): JSX.Element {
    const [ignore, forceUpdate] = useReducer((x) => x + 1, 0); // `forceUpdate` must be implemented in some parts of the code or the 'inputList'state will not update.
    const inputListRef = useRef<IInputList>({
        numberOfQuestions: 1,
        data: [
            {
                question: "",
                numberOfAnswers: 1, // Number of answerers per question.
                answers: [{ answer: "" }],
            },
        ],
    });

    /** Update question input box as you type. */
    const updateQuestion = (
        e: React.ChangeEvent<HTMLInputElement>,
        parentIndex: number
    ): void => {
        const { value } = e.target;
        inputListRef.current.data[parentIndex].question = value;
        forceUpdate();
    };

    /** Update answer input box as you type.  */
    const updateAnswer = (
        e: React.ChangeEvent<HTMLInputElement>,
        parentIndex: number,
        childIndex: number
    ): void => {
        const inputValue = e.target.value;
        inputListRef.current.data[parentIndex].answers[
            childIndex
        ].answer = inputValue;
        forceUpdate();
    };

    /** Append another question input box along with answers children. */
    const addQuestion = (): void => {
        inputListRef.current.data.push({
            question: "",
            numberOfAnswers: 1, // Number of answerers per question.
            answers: [{ answer: "" }],
        });
    };

    /**
     * When user clicks the + or - (add or remove questions), the input box
     * specifying how many questions specified by a number will be emptied.
     * */
    // eslint-disable-next-line camelcase
    const eraseNumberOfQuestionsInputBox = (): void => {
        inputListRef.current.numberOfQuestions = "";
        forceUpdate();
    };

    /** Remove question input box along with answers children. */
    const removeQuestion = (parentIndex: number): void => {
        inputListRef.current.data.splice(parentIndex, 1);
        forceUpdate();
    };

    /** Append another answer to the question */
    const addAnswer = (parentIndex: number): void => {
        inputListRef.current.data[parentIndex].answers.push({ answer: "" });
        forceUpdate();
    };

    /** Remove an answer from the question. */
    const removeAnswer = (parentIndex: number, childIndex: number): void => {
        inputListRef.current.data[parentIndex].answers.splice(childIndex, 1);
        forceUpdate();
    };

    /** Input box specifying the number of questions. */
    const addNumberOfQuestions = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const inputValue = parseInt(e.target.value, 10);

        const list: any = [];
        if (Number.isNaN(inputValue) || inputValue <= 0) {
            inputListRef.current.numberOfQuestions = "";
        } else {
            for (let i = 0; i < inputValue; i++) {
                list.push({
                    question: "",
                    numberOfAnswers: 1, // Number of answerers per question.
                    answers: [{ answer: "" }],
                });
            }
            inputListRef.current.data = list;
            inputListRef.current.numberOfQuestions = inputValue;
        }

        forceUpdate();
    };

    /** Input box specifying the number of answers per question. */
    const addNumberOfAnswers = (
        e: React.ChangeEvent<HTMLInputElement>,
        parentIndex: number
    ): void => {
        const inputValue = parseInt(e.target.value, 10);
        const list: any = [];
        if (Number.isNaN(inputValue) || inputValue <= 0) {
            inputListRef.current.data[parentIndex].numberOfAnswers = "";
            forceUpdate();
        } else {
            for (let i = 0; i < inputValue; i++) {
                list.push({ answer: "" });
            }
            inputListRef.current.data[parentIndex].answers = list;
            inputListRef.current.data[parentIndex].numberOfAnswers = inputValue;
            forceUpdate();
        }
    };

    /**
     * When user clicks the + or - (add or remove answers), the input box
     * specifying how many answers per question specified by a number will be emptied.
     * */
    // eslint-disable-next-line camelcase
    const eraseNumberOfAnswersInputBox = (parentIndex: number): void => {
        inputListRef.current.data[parentIndex].numberOfAnswers = "";
        forceUpdate();
    };

    return (
        <>
            {inputListRef.current.data.map((x: any, i: number) => (
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
                    {inputListRef.current.data.length - 1 === i && (
                        <button
                            type="button"
                            onClick={(): void => {
                                addQuestion();
                                eraseNumberOfQuestionsInputBox(); // Update the number in the questions input.
                            }}
                        >
                            +
                        </button>
                    )}
                    {inputListRef.current.data.length - 1 !== 0 && (
                        <button
                            type="button"
                            onClick={(): void => {
                                removeQuestion(i);
                                eraseNumberOfQuestionsInputBox(); // Update the number in the answers input.
                            }}
                        >
                            -
                        </button>
                    )}
                    {i === 0 && (
                        <input
                            type="text"
                            value={inputListRef.current.numberOfQuestions}
                            onChange={(e): void => addNumberOfQuestions(e)}
                        />
                    )}
                    {x.answers.map((y: any, j: number) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div key={j}>
                            <label htmlFor={`answer${i}${j}`}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Răspunsul#{j}:
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
                                        eraseNumberOfAnswersInputBox(i);
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
                                        eraseNumberOfAnswersInputBox(i);
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
            {JSON.stringify(inputListRef.current, null, 2)}
        </>
    );
}

export default QuizForm;
