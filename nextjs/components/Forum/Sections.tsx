import { useEffect } from "react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import ApiURL from "../ApiURL/ApiURL";

const Sections = (): JSX.Element => {
  const { data, error } = useSWR(`${ApiURL}/GetSections/Get`);

  console.log(data);

  if (!data) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  return <div>Sections</div>;
};

export default Sections;
