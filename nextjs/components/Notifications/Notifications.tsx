import useSWR from "swr";
import apiURL from "../ApiURL/ApiURL";

function Notifications(): JSX.Element {
  const { data, error } = useSWR(`${apiURL}/getNotifications`);

  console.log("data: ", data);

  if (!data) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  return <div>NOTIFICATIONS</div>;
}

export default Notifications;
