import Navbar from "../../../../components/OwnerAdminPanel/Navbar/Navbar";
import MakeOrModifyLearningMaterial from "../../../../components/OwnerAdminPanel/MakeOrModifyLearningMaterial/MakeOrModifyLearningMaterial";

function makeOrModifyLearningMaterial() {
  return (
    <>
      <Navbar />
      <MakeOrModifyLearningMaterial />
    </>
  );
}

export default makeOrModifyLearningMaterial;

export async function getServerSideProps() {
  // This is a dummy in order to make the warning: "Prop `href` did not match. Server:..." go away.
  return { props: {} };
}
