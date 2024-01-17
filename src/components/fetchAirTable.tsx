export async function fetchData(endpoint: string) {
  const API_BASE_URL = process.env.REACT_APP_API_URL || "https://ph-view-airtable-v1.onrender.com/";
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export default fetchData;
