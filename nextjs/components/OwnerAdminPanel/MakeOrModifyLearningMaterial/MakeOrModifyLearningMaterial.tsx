import { useRouter } from "next/router";
import SetCourse from "./SetCourse";
import SetChapter from "./SetChapter";
import SetQuiz from "./SetQuiz";

function MakeOrModifyLearningMaterial() {
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
