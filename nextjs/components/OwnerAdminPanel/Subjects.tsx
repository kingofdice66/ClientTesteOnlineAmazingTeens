<<<<<<< HEAD
function Subjects(props: any) {
  const { subjects } = props;

  console.log("subjects: ", subjects);
=======
import Link from "next/link";

function Subjects(props: any) {
  const { subjects } = props;

>>>>>>> ported_to_nextjs
  return (
    <>
      <div>Subjects</div>
      {subjects.map((subject: any) => (
        <div key={subject.id}>
          <div>
<<<<<<< HEAD
            {subject.name} -- course_id: {subject.course_id}
=======
            <Link
              href={`/owner-admin-panel/subjects/courses/${subject.id}`}
              passHref
            >
              <a href="dummy">{subject.name}</a>
            </Link>
>>>>>>> ported_to_nextjs
          </div>
        </div>
      ))}
    </>
  );
}

export default Subjects;
