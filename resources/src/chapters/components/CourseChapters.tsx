import React, { useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
import { useLocation } from "react-router-dom";
import sendGetData from "../../customComponents/Fetch/sendGetData";
import apiURL from "../../apiURL/ApiURL";
import "./CourseChapters.scss";

interface IData {
    chapters: Array<{ name: string }>;
}

// #######################################################################
//                        Get url parameters.
// #######################################################################
const url: string = window.location.search;
const searchParams: URLSearchParams = new URLSearchParams(url);
const courseID: number = parseInt(searchParams.get("courseID"), 10);
// #######################################################################

function CourseChapters(): JSX.Element {
    /* Data coming from database will be of the form: [{...},{...},...,{...}] so 'chapters' will be of the form '{data: [{...},{...},...,{...}]}'. */
    const [chapters, setChapters] = useState({ data: null });
    const query = new URLSearchParams(useLocation().search);

    useEffect(() => {
        sendGetData(`${apiURL}/api/getChapters`, courseID).then(
            (data: IData) => {
                setChapters((prevState) => {
                    // eslint-disable-next-line no-param-reassign
                    prevState.data = data.chapters;
                    return { ...prevState };
                });
            },
            (error) => console.log("Error: ", error)
        );
        console.log("query: ", query.get("courseID"));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="courseChapters">
            {chapters.data === null
                ? ""
                : chapters.data.map((x: any) => (
                      <div key={uuidV4()}>{x.name}</div>
                  ))}
        </div>
    );
}

export default CourseChapters;
