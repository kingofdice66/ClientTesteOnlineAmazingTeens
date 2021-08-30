// This function is for sending and then subsequently getting data from the server.

interface IProfile {
  method: string;
  header: { "Content-Type": string };
  body: string;
}

async function sendGetData<T, S>(source: string, data: T): Promise<S> {
  const profile: IProfile = {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const fetchData = await fetch(source, profile);
  const json = await fetchData.json();
  return json;
}

export default sendGetData;
