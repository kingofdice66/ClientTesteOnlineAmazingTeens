// This function is for sending data to the server.

interface IProfile {
  method: string;
  header: { "Content-Type": string };
  body: string;
}

async function sendData<T>(source: string, data: T): Promise<void> {
  const profile: IProfile = {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(source, profile);
}

export default sendData;
