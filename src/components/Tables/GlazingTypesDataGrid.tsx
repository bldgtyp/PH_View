import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack, Modal } from "@mui/material";
import StyledDataGrid from "../../styles/DataGrid";
import "../../styles/Modal.css";
import {
  decimalCell,
  notesCell,
  datasheetRequired,
  TooltipHeader,
  datasheetCheckbox,
  LinkCell,
  InfoTooltipCell,
  generateGridColumns,
  generateDefaultRow,
  specificationCheckbox,
} from "./DataGridItems";
import fetchData from "../fetchAirTable";

// ----------------------------------------------------------------------------
// Define the AirTable data types
type GlazingTypesFields = {
  DISPLAY_NAME: string;
  ZONE: string;
  MANUFACTURER: string;
  MODEL: string;
  "G-VALUE [%]": number;
  "U-VALUE [BTU/HR-FT2-F]": number;
  LINK: string;
  DATA_SHEET: string;
  SPECIFICATION: boolean;
  NOTES: string;
  FLAG: string;
};

type GlazingTypesRecord = { id: string; createdTime: string; fields: GlazingTypesFields };
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
    renderHeader: (params: any) => TooltipHeader(params, "Is the product clearly specification in the drawings?"),
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
    field: "u_value",
    headerName: "U-Value",
    flex: 1,
    renderCell: (params: any) => {
      return decimalCell(params, 3);
    },
  },
  {
    field: "g_value",
    headerName: "g-Value",
    flex: 1,
    renderCell: (params: any) => {
      return decimalCell(params, 2);
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
function GlazingTypesDataGrid() {
  let { projectId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState<Array<GlazingTypesRecord>>(defaultRow);

  useEffect(() => {
    // Show modal if loading takes longer than 1s
    let timerId: NodeJS.Timeout;
    timerId = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    // Fetch the data from AirTable
    const fetchProjectData = async () => {
      const fetchedData = await fetchData(`${projectId}/glazing_types`);
      const newRows = fetchedData.map((item: { id: string; fields: GlazingTypesFields }) => {
        item = datasheetRequired(item);
        return {
          id: item.id,
          identifier: item.fields.DISPLAY_NAME,
          u_value: item.fields["U-VALUE [BTU/HR-FT2-F]"],
          g_value: item.fields["G-VALUE [%]"],
          manufacturer: item.fields.MANUFACTURER,
          model: item.fields.MODEL,
          link: item.fields.LINK,
          specification: item.fields.SPECIFICATION,
          data_sheet: item.fields.DATA_SHEET,
          notes: item.fields.NOTES,
          flag: item.fields.FLAG,
        };
      });

      // ---Cleanup
      newRows.length > 0 ? setRowData(newRows) : setRowData(defaultRow);
      clearTimeout(timerId);
      setShowModal(false);
    };
    fetchProjectData();
  }, [projectId]);

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
        <h3>Window Glazing Types:</h3>
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

export default GlazingTypesDataGrid;
