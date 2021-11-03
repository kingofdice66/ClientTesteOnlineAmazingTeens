import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

function Subjects(props: any) {
  const { subjects } = props;
  const router = useRouter();
  const [subjectName, setSubjectName] = useState<string>("");

  useEffect(() => {
    // ...
  }, []);

  const createSubject = (): void => {
    const data = {
      name: subjectName,
    };
    axios.post("http://localhost:4000/subjects", data);
    setSubjectName(""); // Clear textarea;
    router.replace(router.asPath);
  };

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
      {subjects.map((subject: any) => (
        <div key={subject.id}>
          <div>
            {/* prettier-ignore */}
            <Link href={`/owner-admin-panel/learning-material/subjects/courses/${subject.id}`} passHref>
                    <a href="dummy">{subject.name}</a>
                  </Link>
          </div>
        </div>
      ))}
    </>
  );
}

export default Subjects;
