import { useState, useEffect } from "react";
import { Box, Stack, Modal } from "@mui/material";
import StyledDataGrid from "../../styles/DataGrid";
import {
  decimalCell,
  notesCell,
  datasheetRequired,
  TooltipHeader,
  datasheetCheckbox,
  specificationCheckbox,
  LinkCell,
  InfoTooltipCell,
  generateGridColumns,
  generateDefaultRow,
} from "./DataGridItems";
import fetchData from "../fetchAirTable";
import { apiUrlFrameTypes } from "../../config";

// ----------------------------------------------------------------------------
// Define the AirTable data types
type FrameTypesFields = {
  DISPLAY_NAME: string;
  MANUFACTURER: string;
  MODEL: string;
  OPERATION: string;
  LOCATION: string;
  "U-VALUE [BTU/HR-FT2-F]": number;
  "WIDTH [IN]": number;
  "PSI-GLAZING [BTU/HR-FT-F]": number;
  LINK: string;
  SPECIFICATION: boolean;
  DATA_SHEET: string;
  NOTES: string;
  FLAG: string;
};

type FrameTypesRecord = { id: string; createdTime: string; fields: FrameTypesFields };

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
    field: "notes",
    headerName: "Notes",
    flex: 0.5,
    renderCell: (params: any) => notesCell(params),
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
  { field: "operation", headerName: "Operation", flex: 1 },
  { field: "location", headerName: "Location", flex: 1 },
  {
    field: "u_value",
    headerName: "U-Value",
    flex: 1,
    renderCell: (params: any) => {
      return decimalCell(params, 3);
    },
  },
  {
    field: "width_in",
    headerName: "Width [in.]",
    flex: 1,
    renderCell: (params: any) => {
      return decimalCell(params, 2);
    },
  },
  {
    field: "psi_glazing",
    headerName: "Psi-G",
    flex: 1,
    renderCell: (params: any) => {
      return decimalCell(params, 3);
    },
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

// ----------------------------------------------------------------------------
function FrameTypesDataGrid() {
  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState<Array<FrameTypesRecord>>(defaultRow);

  useEffect(() => {
    // Show modal if loading takes longer than 1s
    let timerId: NodeJS.Timeout;
    timerId = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    // Fetch the data from AirTable
    fetchData(apiUrlFrameTypes).then((fetchedData) => {
      const newRows = fetchedData.map((item: any) => {
        item = datasheetRequired(item);

        return {
          id: item.id,
          identifier: item.fields.DISPLAY_NAME,
          location: item.fields.LOCATION,
          u_value: item.fields["U-VALUE [BTU/HR-FT2-F]"],
          width_in: item.fields["WIDTH [IN]"],
          psi_glazing: item.fields["PSI-GLAZING [BTU/HR-FT-F]"],
          manufacturer: item.fields.MANUFACTURER,
          model: item.fields.MODEL,
          operation: item.fields.OPERATION,
          link: item.fields.LINK,
          specification: item.fields.SPECIFICATION,
          data_sheet: item.fields.DATA_SHEET,
          notes: item.fields.NOTES,
          flag: item.fields.FLAG,
        };
      });

      // Cleanup
      newRows.length > 0 ? setRowData(newRows) : setRowData(defaultRow);
      clearTimeout(timerId);
      setShowModal(false);
    });
  }, []);

  // --------------------------------------------------------------------------
  // Render the component
  return (
    <>
      {showModal ? (
        <Modal open={showModal}>
          <Box className="modal-box-loading">Loading Project Data...</Box>
        </Modal>
      ) : null}
      <Stack className="content-block-heading" spacing={1}>
        <h3>Window Frame:</h3>
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

export default FrameTypesDataGrid;
