import "./App.css";
import { useState, useEffect } from "react";
import { Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import LinkIcon from "@mui/icons-material/Link";

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
  LINK: string;
  "CUT SHEET": string;
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

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "MODEL", headerName: "Model", width: 130 },
    { field: "MANUFACTURER", headerName: "Manufacturer", width: 130 },
    {
      field: "HEAT RECOVERY [%]",
      headerName: "HR [%]",
      width: 100,
      valueFormatter: (params) => {
        const value = params.value as number;
        return `${Math.round(value * 100)}%`;
      },
      renderHeader: (params) => (
        <Tooltip title="Heat Recovery Efficiency">
          <span>{params.colDef.headerName}</span>
        </Tooltip>
      ),
    },
    {
      field: "ENERGY RECOVERY [%]",
      headerName: "ER [%]",
      width: 100,
      valueFormatter: (params) => {
        const value = params.value as number;
        return `${Math.round(value * 100)}%`;
      },
      renderHeader: (params) => (
        <Tooltip title="Energy/Moisture Recovery Efficiency">
          <span>{params.colDef.headerName}</span>
        </Tooltip>
      ),
    },
    {
      field: "AIRFLOW [CFM]",
      headerName: "Airflow [CFM]",
      type: "number",
      width: 100,
    },
    {
      field: "LINK",
      headerName: "Link",
      width: 130,
      renderCell: (params) => {
        if (params.value) {
          return (
            <a
              href={params.value as string}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkIcon />
            </a>
          );
        } else {
          return "-";
        }
      },
    },
    {
      field: "CUT SHEET",
      headerName: "Have Cut Sheet?",
      width: 130,
      renderCell: (params) => {
        return params.value ? "Yes" : "No";
      },
      renderHeader: (params) => (
        <Tooltip title="Does the Unit have a Design-Specification?">
          <span>{params.colDef.headerName}</span>
        </Tooltip>
      ),
    },
  ];

  const rows = ervData.map((item: ErvRecord) => {
    return {
      id: item.fields.DISPLAY_NAME,
      MODEL: item.fields.MODEL,
      MANUFACTURER: item.fields.MANUFACTURER,
      "HEAT RECOVERY [%]": item.fields["HEAT RECOVERY [%]"],
      "ENERGY RECOVERY [%]": item.fields["ENERGY RECOVERY [%]"],
      "AIRFLOW [CFM]": item.fields["AIRFLOW [CFM]"],
      LINK: item.fields["LINK"],
      "CUT SHEET": item.fields["CUT SHEET"],
    };
  });

  return (
    <div className="App">
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 100]}
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default App;
