import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import StyledDataGrid from "../styles/DataGrid";
import { TooltipHeader, CheckboxCell, LinkCell } from "./DataGridItems";
import fetchData from "./fetchAirTable";
import { apiUrlErvUnits } from "../config";

// ----------------------------------------------------------------------------
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
  "DATA SHEET": string;
  "DESIGN SPEC?": boolean;
  "FINAL SPEC?": boolean;
};

type ErvRecord = {
  id: string;
  createdTime: string;
  fields: ErvFields;
};

// ----------------------------------------------------------------------------
function ErvDataGrid() {
  const [ervData, setErvData] = useState<Array<ErvRecord>>([]);

  useEffect(() => {
    fetchData(apiUrlErvUnits, setErvData);
  }, []);

  // --------------------------------------------------------------------------
  // Define the rows and columns
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "DESIGN SPEC?",
      headerName: "Design Spec.",
      flex: 1,
      renderCell: (params) => CheckboxCell(params),
      renderHeader: (params) => TooltipHeader(params, "Do we have a clear Design-Phase product specification? Yes/No"),
    },
    {
      field: "FINAL SPEC?",
      headerName: "Final Spec.",
      flex: 1,
      renderCell: (params) => CheckboxCell(params),
      renderHeader: (params) =>
        TooltipHeader(params, "Do we have a PDF Data Sheet with the Unit's Performance values? Yes/No"),
    },
    {
      field: "DATA SHEET",
      headerName: "Data Sheet",
      flex: 1,
      renderCell: (params) => CheckboxCell(params),
      renderHeader: (params) =>
        TooltipHeader(params, "Do we have a PDF Data Sheet with the Unit's Performance values? Yes/No"),
    },
    { field: "MODEL", headerName: "Model", flex: 1 },
    { field: "MANUFACTURER", headerName: "Manufacturer", flex: 1 },
    {
      field: "HEAT RECOVERY [%]",
      headerName: "HR [%]",
      flex: 1,
      valueFormatter: (params) => {
        const value = params.value as number;
        return `${Math.round(value * 100)}%`;
      },
      renderHeader: (params) => TooltipHeader(params, "Heat Recovery Efficiency"),
    },
    {
      field: "ENERGY RECOVERY [%]",
      headerName: "ER [%]",
      flex: 1,
      valueFormatter: (params) => {
        const value = params.value as number;
        return `${Math.round(value * 100)}%`;
      },
      renderHeader: (params) => TooltipHeader(params, "Energy/Moisture Recovery Efficiency"),
    },
    {
      field: "AIRFLOW [CFM]",
      headerName: "Airflow [CFM]",
      type: "number",
      flex: 1,
    },
    {
      field: "LINK",
      headerName: "Link",
      flex: 1,
      renderCell: (params) => LinkCell(params),
    },
  ];

  const rows = ervData.map((item: ErvRecord) => {
    return {
      id: item.fields.DISPLAY_NAME,
      "DESIGN SPEC?": item.fields["DESIGN SPEC?"],
      "FINAL SPEC?": item.fields["FINAL SPEC?"],
      "DATA SHEET": item.fields["DATA SHEET"],
      MODEL: item.fields.MODEL,
      MANUFACTURER: item.fields.MANUFACTURER,
      "HEAT RECOVERY [%]": item.fields["HEAT RECOVERY [%]"],
      "ENERGY RECOVERY [%]": item.fields["ENERGY RECOVERY [%]"],
      "AIRFLOW [CFM]": item.fields["AIRFLOW [CFM]"],
      LINK: item.fields["LINK"],
    };
  });

  // --------------------------------------------------------------------------
  // Render the component
  return (
    <>
      <Stack className="content-block-heading" spacing={1}>
        <h3>ERV Units:</h3>
      </Stack>
      <Box>
        <StyledDataGrid
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
      </Box>
    </>
  );
}

export default ErvDataGrid;
