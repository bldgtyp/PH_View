/**
 * Fetches data from the specified API URL and updates the state using the provided setData function.
 * @param apiUrl The URL of the API to fetch data from.
 * @param setData A function to update the state with the fetched data.
 */
async function fetchData(apiUrl: string, setData: (data: any) => void) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default fetchData;
