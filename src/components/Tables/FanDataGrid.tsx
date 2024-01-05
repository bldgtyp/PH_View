import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import StyledDataGrid from "../../styles/DataGrid";
import {
  TooltipHeader,
  datasheetCheckbox,
  LinkCell,
  InfoTooltipCell,
  generateGridColumns,
  generateDefaultRow,
  specificationCheckbox,
} from "./DataGridItems";
import fetchData from "../fetchAirTable";
import { apiUrlFans } from "../../config";

// ----------------------------------------------------------------------------
// Define the AirTable data types
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
  SPECIFICATION: boolean;
  DATA_SHEET: string;
  LINK: string;
  NOTES: string;
};

type FanRecord = { id: string; createdTime: string; fields: FanFields };

// ----------------------------------------------------------------------------
// Define the table columns and rows to display
const tableFields = [
  { field: "identifier", headerName: "ID", flex: 1, renderCell: (params: any) => InfoTooltipCell(params) },
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
  { field: "manufacturer", headerName: "Manufacturer", flex: 1 },
  { field: "model", headerName: "Model", flex: 1 },
  { field: "service", headerName: "Service", flex: 1 },
  { field: "link", headerName: "Link", flex: 1, renderCell: (params: any) => LinkCell(params) },
];

// Create the columns object based on tableFields and then
// create an Array with a default single row, with all '-' cells.
// This will display while the data is being fetched
const columns = generateGridColumns(tableFields);
const defaultRow = generateDefaultRow(tableFields);

// ----------------------------------------------------------------------------
function FanDataGrid() {
  const [rowData, setRowData] = useState<Array<FanRecord>>(defaultRow);

  useEffect(() => {
    fetchData(apiUrlFans).then((fetchedData) => {
      const newRows = fetchedData.map((item: any) => ({
        id: item.id,
        identifier: item.fields.ID_NUMBER,
        specification: item.fields.SPECIFICATION,
        data_sheet: item.fields.DATA_SHEET,
        name: item.fields.DISPLAY_NAME,
        manufacturer: item.fields.MANUFACTURER,
        model: item.fields.MODEL,
        service: item.fields.SERVICE,
        link: item.fields.LINK,
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
        <h3>Fans:</h3>
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

export default FanDataGrid;
