import "./App.css";
import React, { useState, useEffect } from "react";

type ErvFields = {
  "AIRFLOW [CFM]": number;
  "DEFROST MIN TEMP [°F]": number;
  DISPLAY_NAME: string;
  "DUCT_ETA_SIZE [IN]": string;
  "DUCT_SUP_SIZE [IN]": string;
  "ELECTRICAL EFFICIENCY [W/CFM]": number;
  "ELECTRICAL_EFFICIENCY [W/CFM]": number;
  "ENERGY RECOVERY [%]": number;
  "ERV: RISERS": Array<string>;
  "HAS SUMMER BYPASS?": string;
  "HAVE AHRI TESTING?": string;
  "HAVE SPEC?": "No";
  "HEAT RECOVERY [%]": number;
  "IN CONDITIONED SPACE?": string;
  MANUFACTURER: string;
  MODEL: string;
  "Name (from ERV: RISERS)": Array<string>;
  "ROOMS SERVED": Array<string>;
  "WATTAGE [W]": number;
  "WINTER DEFROST PROTECTION?": string;
};

type ErvRecord = {
  id: string;
  createdTime: string;
  fields: ErvFields;
};

function App() {
  const [ervData, setErvData] = useState<Array<ErvRecord>>([]);

  useEffect(() => {
    // Use environment variable for API URL
    const apiUrlBase: any =
      process.env.REACT_APP_API_URL || "https://ph-view.onrender.com/";

    const apiUrl = apiUrlBase + "erv_units";

    console.log("API URL:", apiUrl); // Add this line

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => {
        // Check if the response is successful (status code 200)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Parse the JSON response
        return response.json();
      })
      .then((data: Array<ErvRecord>) => {
        // Set the message from the API response
        setErvData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <div className="App">
      <header className="App-header">
        {ervData &&
          Object.values(ervData).map((item: ErvRecord) => (
            <div key={item.id}>
              {item.createdTime}: {item.fields.DISPLAY_NAME}
            </div>
          ))}
      </header>
    </div>
  );
}

export default App;
