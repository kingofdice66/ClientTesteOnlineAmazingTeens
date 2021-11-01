function Subjects(props: any) {
  const { subjects } = props;

  console.log("subjects: ", subjects);
  return (
    <>
      <div>Subjects</div>
      {subjects.map((subject: any) => (
        <div key={subject.id}>
          <div>
            {subject.name} -- course_id: {subject.course_id}
          </div>
        </div>
      ))}
    </>
  );
}

export default Subjects;
