import Link from "next/link";

function Courses(props: any) {
  const { courses } = props;

  return (
    <>
      <div>Courses</div>
      {courses.map((course: any) => (
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
