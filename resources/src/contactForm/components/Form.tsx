import React, { useState } from "react";
import sendData from "../../customComponents/Fetch/sendData";
import apiURL from "../../apiURL/ApiURL";
import "./Form.scss";

interface IData {
    name: string;
    username: string; // Only if the user is registered.
    email: string;
    subject: string; // What is it about.
    message: string; // The message.
}

interface IInputError {
    name: string;
    username: string;
    email: string;
    subject: string;
    textarea: string;
}

function Form(): JSX.Element {
    const [data, setData] = useState<IData>({
        name: "",
        username: "",
        email: "",
        subject: "",
        message: "",
    });

    /* ************************************************** */
    /*      Check for errors in the input fields          */
    /* ************************************************** */
    const [errorInput, setErrorInput] = useState<IInputError>({
        name: "",
        username: "",
        email: "",
        subject: "",
        textarea: "",
    });
    /* ************************************************** */

    /** Check for errors in the input fields */
    const inputErrors = (): boolean => {
        let error = false; // error flag

        /* ************************************************** */
        /*            Check name input field                  */
        /* ************************************************** */
        const namePattern = /^[ ]*$/;
        if (data.name.length === 0 || namePattern.test(data.name)) {
            setErrorInput((prevState: IInputError) => {
                // eslint-disable-next-line no-param-reassign
                prevState.name = "Câmpul nu poate fi gol!";
                return { ...prevState };
            });
            error = true;
        } else if (data.name.length < 3) {
            setErrorInput((prevState: IInputError) => {
                // eslint-disable-next-line no-param-reassign
                prevState.name =
                    "Câmpul nu poate contine mai putin de 3 caractere!";
                return { ...prevState };
            });
            error = true;
        } else if (data.name.length > 20) {
            setErrorInput((prevState: IInputError) => {
                // eslint-disable-next-line no-param-reassign
                prevState.name =
                    "Câmpul nu poate contine mai mult de 40 de caractere!";
                return { ...prevState };
            });
            error = true;
        } else {
            setErrorInput((prevState: IInputError) => {
                // eslint-disable-next-line no-param-reassign
                prevState.name = "";
                return { ...prevState };
            });
        }
        /* ************************************************** */
        /*            Check username input field              */
        /* ************************************************** */
        const usernamePatter = /^[ ]*$/;
        if (data.username.length === 0 || usernamePatter.test(data.username)) {
            setErrorInput((prevState: IInputError) => {
                // eslint-disable-next-line no-param-reassign
                prevState.username = "Câmpul nu poate fi gol!";
                return { ...prevState };
            });
            error = true;
        } else if (data.username.length < 3) {
            setErrorInput((prevState: IInputError) => {
                // eslint-disable-next-line no-param-reassign
                prevState.username =
                    "Câmpul nu poate contine mai putin de 3 caractere!";
                return { ...prevState };
            });
            error = true;
        } else if (data.username.length > 20) {
            setErrorInput((prevState: IInputError) => {
                // eslint-disable-next-line no-param-reassign
                prevState.username =
                    "Câmpul nu poate contine mai mult de 40 de caractere!";
                return { ...prevState };
            });
            error = true;
        } else {
            setErrorInput((prevState: IInputError) => {
                // eslint-disable-next-line no-param-reassign
                prevState.username = "";
                return { ...prevState };
            });
        }
        /* ************************************************** */
        /*            Check email input field                 */
        /* ************************************************** */
        const emailPattern = /^[ ]*$/;
        if (data.email.length === 0 || emailPattern.test(data.email)) {
            setErrorInput((prevState: IInputError) => {
                // eslint-disable-next-line no-param-reassign
                prevState.email = "Câmpul nu poate fi gol!";
                return { ...prevState };
            });
            error = true;
        } else if (data.email.length < 3) {
            setErrorInput((prevState: IInputError) => {
                // eslint-disable-next-line no-param-reassign
                prevState.email =
                    "Câmpul nu poate contine mai putin de 3 caractere!";
                return { ...prevState };
            });
            error = true;
        } else if (data.email.length > 300) {
            setErrorInput((prevState: IInputError) => {
                // eslint-disable-next-line no-param-reassign
                prevState.email =
                    "Câmpul nu poate contine mai mult de 300 de caractere!";
                return { ...prevState };
            });
            error = true;
        } else {
            setErrorInput((prevState: IInputError) => {
                // eslint-disable-next-line no-param-reassign
                prevState.email = "";
                return { ...prevState };
            });
        }
        /* ************************************************** */
        /*            Check subject input field               */
        /* ************************************************** */
        const subjectPattern = /^[ ]*$/;
        if (data.subject.length === 0 || subjectPattern.test(data.subject)) {
            setErrorInput((prevState: IInputError) => {
                // eslint-disable-next-line no-param-reassign
                prevState.subject = "Câmpul nu poate fi gol!";
                return { ...prevState };
            });
            error = true;
        } else if (data.subject.length < 3) {
            setErrorInput((prevState: IInputError) => {
                // eslint-disable-next-line no-param-reassign
                prevState.subject =
                    "Câmpul nu poate contine mai putin de 3 caractere!";
                return { ...prevState };
            });
            error = true;
        } else if (data.subject.length > 20) {
            setErrorInput((prevState: IInputError) => {
                // eslint-disable-next-line no-param-reassign
                prevState.subject =
                    "Câmpul nu poate contine mai mult de 40 de caractere!";
                return { ...prevState };
            });
            error = true;
        } else {
            setErrorInput((prevState: IInputError) => {
                // eslint-disable-next-line no-param-reassign
                prevState.subject = "";
                return { ...prevState };
            });
        }
        /* ************************************************** */
        /*            Check textarea input field              */
        /* ************************************************** */
        const textareaPattern = /^[ ]*$/;
        if (data.message.length === 0 || textareaPattern.test(data.message)) {
            setErrorInput((prevState: IInputError) => {
                // eslint-disable-next-line no-param-reassign
                prevState.textarea = "Câmpul nu poate fi gol!";
                return { ...prevState };
            });
            error = true;
        } else {
            setErrorInput((prevState: IInputError) => {
                // eslint-disable-next-line no-param-reassign
                prevState.textarea = "";
                return { ...prevState };
            });
        }
        /* ************************************************** */

        return error;
    };

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (!inputErrors()) {
            console.log("Success");
            sendData<IData>(`${apiURL}contactFormMail`, data);
        } else {
            console.log("Error");
        }
    };

    return (
        <>
            <div className="formFields-wrapper">
                <div className="formFields-centered">
                    <div className="formFields">
                        <form onSubmit={submit}>
                            <label htmlFor="name">
                                <span className="formFieldName-style">
                                    Numele:
                                    <span
                                        style={{ color: "red", fontSize: 25 }}
                                    >
                                        *
                                    </span>
                                </span>
                                <br />
                                <input
                                    type="text"
                                    id="name"
                                    className="formField-input"
                                    onChange={(e): void =>
                                        setData({
                                            ...data,
                                            name: e.target.value.trim(),
                                        })
                                    }
                                />
                                <div>{errorInput.name}</div>
                            </label>
                            <br />
                            <br />
                            <label htmlFor="username">
                                <span className="formFieldName-style">
                                    Username:
                                </span>
                                <br />
                                <input
                                    type="text"
                                    id="username"
                                    className="formField-input"
                                    onChange={(e): void =>
                                        setData({
                                            ...data,
                                            username: e.target.value.trim(),
                                        })
                                    }
                                />
                                <div>{errorInput.username}</div>
                            </label>
                            <br />
                            <br />
                            <label htmlFor="email">
                                <span className="formFieldName-style">
                                    Adresa ta de email:
                                    <span
                                        style={{ color: "red", fontSize: 25 }}
                                    >
                                        *
                                    </span>
                                </span>
                                <br />
                                <input
                                    type="text"
                                    id="email"
                                    className="formField-input"
                                    onChange={(e): void =>
                                        setData({
                                            ...data,
                                            email: e.target.value.trim(),
                                        })
                                    }
                                />
                                <div>{errorInput.email}</div>
                            </label>
                            <br />
                            <br />
                            <label htmlFor="subject">
                                <span className="formFieldName-style">
                                    Subiect:
                                    <span
                                        style={{ color: "red", fontSize: 25 }}
                                    >
                                        *
                                    </span>
                                </span>
                                <br />
                                <input
                                    type="text"
                                    id="subject"
                                    className="formField-input"
                                    onChange={(e): void =>
                                        setData({
                                            ...data,
                                            subject: e.target.value.trim(),
                                        })
                                    }
                                />
                                <div>{errorInput.subject}</div>
                            </label>
                            <br />
                            <br />
                            <label htmlFor="message">
                                <span className="formFieldName-style">
                                    Întrebare/Mesaj:
                                    <span
                                        style={{ color: "red", fontSize: 25 }}
                                    >
                                        *
                                    </span>
                                </span>
                                <br />
                                <textarea
                                    id="message"
                                    className="formField-textarea"
                                    onChange={(e): void =>
                                        setData({
                                            ...data,
                                            message: e.target.value.trim(),
                                        })
                                    }
                                />
                                <div>{errorInput.textarea}</div>
                            </label>
                            <br />
                            <br />
                            <button
                                type="submit"
                                value="Trimite Email"
                                className="formField-submitButton"
                            >
                                <span className="formField-submitButton-text">
                                    Timite Email
                                </span>
                            </button>
                        </form>
                        <br />
                        <div>
                            <span className="formField-footerMessage">
                                Toate câmpurile marcate cu
                                <br />
                                steluță roșie sunt obligatorii!
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Form;
