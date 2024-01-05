/**
 * Fetches data from the specified API URL.
 * @param apiUrl The URL of the API to fetch data from.
 * @returns A Promise that resolves to the fetched data.
 */
async function fetchData(apiUrl: string): Promise<any> {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // re-throw the error so it can be caught and handled by the calling code
  }
}

export default fetchData;
