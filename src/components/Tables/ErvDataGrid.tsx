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
import { apiUrlErvUnits } from "../../config";

// ----------------------------------------------------------------------------
// Define the AirTable data types
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
  SPECIFICATION: boolean;
  DATA_SHEET: string;
  NOTES: string;
};

type ErvRecord = {
  id: string;
  createdTime: string;
  fields: ErvFields;
};

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
  { field: "manufacturer", headerName: "Manuf.", flex: 1 },
  { field: "model", headerName: "Model", flex: 1 },
  {
    field: "heat recovery [%]",
    headerName: "HR [%]",
    flex: 1,
    valueFormatter: (params: any) => {
      const value = params.value as number;
      return `${Math.round(value * 100)}%`;
    },
    renderHeader: (params: any) => TooltipHeader(params, "Heat Recovery Efficiency"),
  },
  {
    field: "energy recovery [%]",
    headerName: "ER [%]",
    flex: 1,
    valueFormatter: (params: any) => {
      const value = params.value as number;
      return `${Math.round(value * 100)}%`;
    },
    renderHeader: (params: any) => TooltipHeader(params, "Energy/Moisture Recovery Efficiency"),
  },
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

function ErvDataGrid() {
  const [rowData, setRowData] = useState<Array<ErvRecord>>(defaultRow);

  useEffect(() => {
    fetchData(apiUrlErvUnits).then((fetchedData) => {
      const newRows = fetchedData.map((item: any) => ({
        id: item.id,
        identifier: item.fields.DISPLAY_NAME,
        specification: item.fields.SPECIFICATION,
        data_sheet: item.fields.DATA_SHEET,
        manufacturer: item.fields.MANUFACTURER,
        model: item.fields.MODEL,
        "heat recovery [%]": item.fields["HEAT RECOVERY [%]"],
        "energy recovery [%]": item.fields["ENERGY RECOVERY [%]"],
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
        <h3>ERV Units:</h3>
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

export default ErvDataGrid;
