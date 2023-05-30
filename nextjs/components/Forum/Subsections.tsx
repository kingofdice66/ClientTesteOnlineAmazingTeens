import { useRouter } from "next/router";

const Subsections = (): JSX.Element => {
  const { subsectionId } = useRouter().query;

  return <div>SubsectionId: {subsectionId}</div>;
};

export default Subsections;
