import useSWR from "swr";
import Link from "next/link";
import apiURL from "../../ApiURL/ApiURL";

function Courses() {
  const { data, error } = useSWR(`${apiURL}/courses`);

  if (!data) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <>
      <div>Courses</div>
      {/* <button type="button">Button</button> */}
      {data.map((course: any) => (
        <div key={course.id}>
          <div>
            <Link
              href={`/owner-admin-panel/learning-material/subjects/courses/3/chapters/${course.id}`}
              passHref
            >
              <a href="dummy">{course.name}</a>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}

export default Courses;
