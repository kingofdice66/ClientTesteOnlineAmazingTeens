import React, { useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
import getData from "../../customComponents/Fetch/getData";
import apiURL from "../../apiURL/ApiURL";

interface ICourses {
    name: string;
    id: number;
}

type TCourse = Array<ICourses>;

function CoursesOffered(): JSX.Element {
    /**
     * Data coming from database will be of the form: [{...},{...},...,{...}]
     * so after 'setCourses' will be like [[{...},{...},...,{...}]], an array within an array.
     * Therefore we will need 'courses[0]' to map it out.
     */
    const [courses, setCourses] = useState<Array<TCourse>>([]);

    useEffect(() => {
        getData(`${apiURL}/api/getCourses`).then(
            (data) => {
                setCourses((prevState) => {
                    prevState.push(data.courses);
                    return [...prevState];
                });
            },
            (error) => console.log("Error: ", error)
        );
        console.log("data");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log("courses: ", courses[0]);
    return (
        <>
            {courses[0] === undefined
                ? ""
                : courses[0].map((x: any) => (
                      <div key={uuidV4()}>
                          <div>Name: {x.name}</div>
                          <div>ID: {x.id}</div>
                      </div>
                  ))}
        </>
    );
}

export default CoursesOffered;
