import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import apiURL from "../../ApiURL/ApiURL";

function Subjects(): JSX.Element {
  const router = useRouter();
  const { data, error } = useSWR(`${apiURL}/getSubjects`);
  const [subjectName, setSubjectName] = useState<string>("");

  const createSubject = (): void => {
    axios
      .post(`${apiURL}/setSubjects`, { subjectName })
      .then(() => router.replace(router.asPath))
      .catch((err: any) => console.error(err));

    setSubjectName(""); // Clear textarea;
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
          onChange={(e): void => setSubjectName(e.target.value)}
          cols={30}
          rows={3}
        />
      </label>
      <br />
      {/* prettier-ignore */}
      <button type="button" onClick={createSubject}>Creeaza</button>
      <div>Subjects</div>
      {data.map((subject: any) => (
        <div key={subject.id}>
          {/* prettier-ignore */}
          <Link href={`/owner-admin-panel/learning-material/subjects/courses/${subject.id}`} passHref>
            <a href="dummy">{subject.name}</a>
          </Link>
        </div>
      ))}
    </>
  );
}

export default Subjects;
