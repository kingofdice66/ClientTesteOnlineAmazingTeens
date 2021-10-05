import React, { useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
import { Link } from "react-router-dom";
import getData from "../../customComponents/Fetch/getData";
import apiURL from "../../apiURL/ApiURL";
import "./CoursesOffered.scss";

function CoursesOffered(): JSX.Element {
    /* Data coming from database will be of the form: [{...},{...},...,{...}] so 'courses' will be of the form '{data: [{...},{...},...,{...}]}'. */
    const [courses, setCourses] = useState({ data: null });

    useEffect(() => {
        getData(`${apiURL}/api/getCourses`).then(
            (data) => {
                setCourses((prevState: any) => {
                    // eslint-disable-next-line no-param-reassign
                    prevState.data = data.courses;
                    return { ...prevState };
                });
                console.log("data: ", courses.data);
            },
            (error) => console.log("Error: ", error)
        );
        console.log("data");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="courses">
            <Link to="/Chapters?courseID=1">TEST</Link>
            {courses.data === null
                ? ""
                : courses.data.map((x: any) => (
                      <div key={uuidV4()}>
                          <a href={`Chapters?courseID=${x.id}`}>
                              Name: {x.name}
                          </a>
                      </div>
                  ))}
        </div>
    );
}

export default CoursesOffered;
