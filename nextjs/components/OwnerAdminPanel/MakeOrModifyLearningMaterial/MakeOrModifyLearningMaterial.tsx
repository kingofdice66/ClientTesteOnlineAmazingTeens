import { useRouter } from "next/router";
import SetCourse from "./SetCourses";
import SetChapter from "./SetChapters";
import SetQuiz from "./SetQuizes";

function MakeOrModifyLearningMaterial(): JSX.Element {
  const router = useRouter();
  const { set } = router.query;

  console.log("router.query: ", router.query);

  return (
    <>
      {set === "course" || set === "all" ? <SetCourse /> : ""}
      {set === "chapter" || set === "all" ? <SetChapter /> : ""}
      {set === "all" ? <SetQuiz /> : ""}
    </>
  );
}

export default MakeOrModifyLearningMaterial;
