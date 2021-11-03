<<<<<<< HEAD
function Chapters() {
  return <div>Chapters</div>;
=======
function Chapters(props: any) {
  const { chapterId, subjectId } = props;

  console.log("chapterId: ", chapterId);
  console.log("subjectId: ", subjectId);

  return <div>ChaptersX</div>;
>>>>>>> ported_to_nextjs
}

export default Chapters;
