import { SWRConfig } from "swr";
import axios from "axios";
import Notifications from "../../components/Notifications/Notifications";
import apiURL from "../../components/ApiURL/ApiURL";

function notifications(props: any): JSX.Element {
  const { fallback } = props;

  return (
    <SWRConfig value={{ fallback }}>
      <Notifications />
    </SWRConfig>
  );
}

export default notifications;

interface ISSP {
  props: { fallback: { [x: string]: any } };
}

export async function getServerSideProps(): Promise<ISSP> {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const notifications = await axios.get(`${apiURL}/getNotifications`);

  return {
    props: { fallback: { [`${apiURL}/getNotifications`]: notifications.data } },
  };
}
