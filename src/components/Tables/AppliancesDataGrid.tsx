import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import StyledDataGrid from "../../styles/DataGrid";
import {
  TooltipHeader,
  datasheetCheckbox,
  specificationCheckbox,
  LinkCell,
  InfoTooltipCell,
  generateGridColumns,
  generateDefaultRow,
} from "./DataGridItems";
import fetchData from "../fetchAirTable";
import { apiUrlAppliances } from "../../config";

// ----------------------------------------------------------------------------
// Define the AirTable data types
type AppliancesFields = {
  DISPLAY_NAME: string;
  ZONE: string;
  DESCRIPTION: string;
  MANUFACTURER: string;
  MODEL: string;
  ENERGY_STAR: string;
  SPECIFICATION: boolean;
  DATA_SHEET: string;
  LINK: string;
  NOTES: string;
};

type AppliancesRecord = { id: string; createdTime: string; fields: AppliancesFields };

// --------------------------------------------------------------------------
// Define the rows and columns
const tableFields = [
  {
    field: "identifier",
    headerName: "ID",
    flex: 1,
    renderCell: (params: any) => InfoTooltipCell(params),
  },
  {
    field: "specification",
    headerName: "Specification",
    flex: 1,
    renderCell: (params: any) => specificationCheckbox(params),
    renderHeader: (params: any) => TooltipHeader(params, "Do we have a product specification? Yes/No"),
  },
  {
    field: "data_sheet",
    headerName: "Data Sheet",
    flex: 1,
    renderCell: (params: any) => datasheetCheckbox(params),
    renderHeader: (params: any) =>
      TooltipHeader(params, "Do we have a PDF data-sheet with the product's performance values? Yes/No"),
  },
  { field: "description", headerName: "Type", flex: 1 },
  { field: "manufacturer", headerName: "Manuf.", flex: 1 },
  { field: "model", headerName: "Model", flex: 1 },
  { field: "zone", headerName: "Zone", flex: 1 },
  { field: "energy_star", headerName: "EnergyStar", flex: 1 },
  {
    field: "link",
    headerName: "Link",
    flex: 1,
    renderCell: (params: any) => LinkCell(params),
  },
];

// Create the columns object based on tableFields and then
// create an Array with a default single row, with all '-' cells.
// This will display while the data is being fetched
const columns = generateGridColumns(tableFields);
const defaultRow = generateDefaultRow(tableFields);

// ----------------------------------------------------------------------------
function AppliancesDataGrid() {
  const [rowData, setRowData] = useState<Array<AppliancesRecord>>(defaultRow);

  useEffect(() => {
    fetchData(apiUrlAppliances).then((fetchedData) => {
      const newRows = fetchedData.map((item: any) => ({
        id: item.id,
        identifier: item.fields.DISPLAY_NAME,
        specification: item.fields.SPECIFICATION,
        data_sheet: item.fields.DATA_SHEET,
        link: item.fields.LINK,
        energy_star: item.fields.ENERGY_STAR,
        zone: item.fields.ZONE,
        manufacturer: item.fields.MANUFACTURER,
        model: item.fields.MODEL,
        description: item.fields.DESCRIPTION,
        notes: item.fields.NOTES,
      }));
      newRows.length > 0 ? setRowData(newRows) : setRowData(defaultRow);
    });
  }, []);

  // --------------------------------------------------------------------------
  // Render the component
  return (
    <>
      <Stack className="content-block-heading" spacing={1}>
        <h3>Appliances Fixtures:</h3>
      </Stack>
      <Box>
        <StyledDataGrid
          rows={rowData}
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

export default AppliancesDataGrid;
