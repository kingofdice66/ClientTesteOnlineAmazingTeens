import React from "react";
import TinyMCE from "../../tinyMCE/TinyMCE";

function MakeCourseForm(): JSX.Element {
    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log("Form Submitted");
    };
    return (
        <>
            <form onSubmit={submit}>
                <label htmlFor="courseName">
                    <input
                        type="text"
                        id="courseName"
                        placeholder="Numele cursului ..."
                    />
                </label>
                <br />
                <br />
                <TinyMCE />
                <br />
                <br />
                <button type="submit">Adaugă Curs</button>
            </form>
        </>
    );
}

export default MakeCourseForm;
