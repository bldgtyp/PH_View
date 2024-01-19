import constants from "../data/constants.json";

export async function fetchData(endpoint: string) {
  const API_BASE_URL: string = process.env.REACT_APP_API_URL || constants.RENDER_API_BASE_URL;
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // add delay for testing
  // await new Promise((resolve) => setTimeout(resolve, 4000));

  return await response.json();
}

export default fetchData;
