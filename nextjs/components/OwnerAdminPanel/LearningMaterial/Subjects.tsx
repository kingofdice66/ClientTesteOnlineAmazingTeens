import useSWR, { mutate } from "swr";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import apiURL from "../../ApiURL/ApiURL";

function Subjects() {
  const { data, error } = useSWR(`${apiURL}/getSubjects`);
  const [subjectName, setSubjectName] = useState<string>("");

  const createSubject = (): void => {
    axios.post(`${apiURL}/setSubjects`, { subjectName });
    setSubjectName(""); // Clear textarea;
    // mutate(`${apiURL}/getSubjects`, [...data, subj], false);
  };

  console.log("data: ", data);

  if (!data) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <>
      <label htmlFor="subjects">
        <textarea
          id="subjects"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          cols={30}
          rows={3}
        />
      </label>
      <br />
      {/* prettier-ignore */}
      <button type="button" onClick={createSubject}>Creeaza</button>
      <div>Subjects</div>
      {
        // data.map((subject: any) => (
        //   <React.Fragment key={subject.id}>
        //     <div>
        //       {/* prettier-ignore */}
        //       <Link href={`/owner-admin-panel/learning-material/subjects/courses/${subject.id}`} passHref>
        //         <a href="dummy">{subject.name}</a>
        //       </Link>
        //     </div>
        //   </React.Fragment>
        // ))
      }
    </>
  );
}

export default Subjects;
