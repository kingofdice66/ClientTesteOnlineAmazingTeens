import { useRouter } from "next/router";
import SetCourse from "./SetCourses";
import SetChapter from "./SetChapters";
import SetQuizzes from "./SetQuizzes";

function MakeOrModifyLearningMaterial(): JSX.Element {
  const router = useRouter();
  const { set } = router.query;

  return (
    <>
      {set === "courses" || set === "all" ? <SetCourse /> : ""}
      {set === "chapters" || set === "all" ? <SetChapter /> : ""}
      {set === "all" ? <SetQuizzes /> : ""}
    </>
  );
}

export default MakeOrModifyLearningMaterial;
