import Link from "next/link";

function Subjects(props: any) {
  const { subjects } = props;

  return (
    <>
      <div>Subjects</div>
      {subjects.map((subject: any) => (
        <div key={subject.id}>
          <div>
            <Link
              href={`/owner-admin-panel/subjects/courses/${subject.id}`}
              passHref
            >
              <a href="dummy">{subject.name}</a>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}

export default Subjects;
