// This function is for getting data from the server

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getData(source: string): Promise<any> {
  const data = await fetch(source);
  const json = await data.json();
  return json;
}

export default getData;
