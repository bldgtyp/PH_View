import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Use environment variable for API URL
    const apiUrl: any =
      process.env.REACT_APP_API_URL || "https://ph-view.onrender.com/";

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
      .then((data) => {
        // Set the message from the API response
        setMessage(data.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <div className="App">
      <header className="App-header">
        <h1>{message}</h1>
      </header>
    </div>
  );
}

export default App;
