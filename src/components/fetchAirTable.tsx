export async function fetchData(endpoint: string) {
  const RENDER_API_BASE_URL = "https://ph-view-airtable-v1.onrender.com/";
  const API_BASE_URL = process.env.REACT_APP_API_URL || RENDER_API_BASE_URL;
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export default fetchData;
