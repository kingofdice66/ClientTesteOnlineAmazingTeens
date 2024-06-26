import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import apiURL from "../../ApiURL/ApiURL";

function Courses(): JSX.Element {
  const router = useRouter();
  const { subjectId } = router.query;
  const { data, error } = useSWR(`${apiURL}/getCourses`);

  if (!data) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <>
      <div>Courses</div>
      <Link
        href={
          "/owner-admin-panel/learning-material/make-or-modify-learning-material?" +
          "set=courses&" +
          `subjectId=${subjectId}&` +
          "updateCoursesOnType=no&" +
          "showSetCoursesBtn=yes"
        }
        passHref
      >
        <a href="dummy">Creeaza Curs</a>
      </Link>
      {data.map((course: any) => (
        <div key={course.id}>
          <div>
            {/* prettier-ignore */}
            <Link href={`/owner-admin-panel/learning-material/subjects/courses/${subjectId}/chapters/${course.id}`} passHref>
              <a href="dummy">{course.name}</a>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}

export default Courses;
