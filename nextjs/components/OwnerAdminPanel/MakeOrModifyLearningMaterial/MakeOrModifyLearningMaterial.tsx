import { useRouter } from "next/router";

function MakeOrModifyLearningMaterial() {
  const router = useRouter();
  console.log("router.query: ", router.query);

  return <div>Make or modify learning material</div>;
}

export default MakeOrModifyLearningMaterial;
