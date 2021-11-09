import Navbar from "../../../../components/OwnerAdminPanel/Navbar/Navbar";
import MakeOrModifyLearningMaterial from "../../../../components/OwnerAdminPanel/MakeOrModifyLearningMaterial/MakeOrModifyLearningMaterial";

function makeOrModifyLearningMaterial(): JSX.Element {
  return (
    <>
      <Navbar />
      <MakeOrModifyLearningMaterial />
    </>
  );
}

export default makeOrModifyLearningMaterial;

interface ISSP {
  props: any;
}

export async function getServerSideProps(): Promise<ISSP> {
  // This is a dummy in order to make the warning: "Prop `href` did not match. Server:..." go away.
  return { props: {} };
}
