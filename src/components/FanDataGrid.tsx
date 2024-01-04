import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import StyledDataGrid from "../styles/DataGrid";
import { TooltipHeader, CheckboxCell, LinkCell } from "./DataGridItems";
import fetchData from "./fetchAirTable";
import { apiUrlFans } from "../config";

// ----------------------------------------------------------------------------
type FanFields = {
  DISPLAY_NAME: string;
  QUANTITY: number;
  ID_NUMBER: string;
  SERVICE: string;
  LOCATION: string;
  MANUFACTURER: string;
  MODEL: string;
  CFM: number;
  "VOLTS [V]": number;
  HP: number;
  "AMPS [A]": number;
  "ENERGY DEMAND [W]": number;
  DESIGN_SPEC: boolean;
  DESIGN_DATA_SHEET: boolean;
  FINAL_SPEC: boolean;
  FINAL_DATA_SHEET: boolean;
  LINK: string;
};

type FanRecord = { id: string; createdTime: string; fields: FanFields };

// ----------------------------------------------------------------------------
function FanDataGrid() {
  const [fanData, setFanData] = useState<Array<FanRecord>>([]);

  useEffect(() => {
    fetchData(apiUrlFans, setFanData);
  }, []);

  // --------------------------------------------------------------------------
  // Define the rows and columns
  const columns: GridColDef[] = [
    { field: "identifier", headerName: "ID", flex: 1 },
    {
      field: "design_spec",
      headerName: "Design Spec?",
      flex: 1,
      renderCell: (params) => CheckboxCell(params),
      renderHeader: (params) => TooltipHeader(params, "Do we have a clear Design-Phase product specification? Yes/No"),
    },
    {
      field: "design_data_sheet?",
      headerName: "Design Data Sheet?",
      flex: 1,
      renderCell: (params) => CheckboxCell(params),
      renderHeader: (params) =>
        TooltipHeader(params, "Do we have a PDF data-sheet with the product's design values? Yes/No"),
    },
    {
      field: "final_spec",
      headerName: "Final Spec?",
      flex: 1,
      renderCell: (params) => CheckboxCell(params),
      renderHeader: (params) =>
        TooltipHeader(params, "Do we have a clear Final (as-built) product specification? Yes/No"),
    },
    {
      field: "final_data_sheet?",
      headerName: "Final Data Sheet?",
      flex: 1,
      renderCell: (params) => CheckboxCell(params),
      renderHeader: (params) =>
        TooltipHeader(params, "Do we have a PDF data-sheet with the product's final (as-built) values? Yes/No"),
    },
    { field: "service", headerName: "Service", flex: 1 },
    { field: "manufacturer", headerName: "Manuf.", flex: 1 },
    { field: "model", headerName: "Model", flex: 1 },
    {
      field: "LINK",
      headerName: "Link",
      flex: 1,
      renderCell: (params) => LinkCell(params),
    },
  ];

  const rows = fanData.map((item: FanRecord) => {
    return {
      id: item.id,
      identifier: item.fields.ID_NUMBER,
      design_spec: item.fields.DESIGN_SPEC,
      design_data_sheet: item.fields.DESIGN_DATA_SHEET,
      final_spec: item.fields.FINAL_SPEC,
      final_data_sheet: item.fields.FINAL_DATA_SHEET,
      name: item.fields.DISPLAY_NAME,
      service: item.fields.SERVICE,
      manufacturer: item.fields.MANUFACTURER,
      model: item.fields.MODEL,
      link: item.fields.LINK,
    };
  });

  // --------------------------------------------------------------------------
  // Render the component
  return (
    <>
      <Stack className="content-block-heading" spacing={1}>
        <h3>Fans:</h3>
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

export default FanDataGrid;
