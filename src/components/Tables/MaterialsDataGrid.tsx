import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack, Modal } from "@mui/material";
import StyledDataGrid from "../../styles/DataGrid";
import {
  decimalCell,
  notesCell,
  datasheetRequired,
  TooltipHeader,
  specificationCheckbox,
  datasheetCheckbox,
  LinkCell,
  InfoTooltipCell,
  generateGridColumns,
  generateDefaultRow,
} from "./DataGridItems";
import fetchData from "../fetchAirTable";

// ----------------------------------------------------------------------------
// Define the AirTable data types
type MaterialsFields = {
  DISPLAY_NAME: string;
  LAYER_MATERIAL_NAME: string;
  "MATERIAL RESISTIVITY [HR-FT2-F / BTU-IN]": number;
  LINK: string;
  SPECIFICATION: string;
  DATA_SHEET?: [{ url: string; required: boolean }];
  NOTES: string;
  FLAG: string;
};

type MaterialsRecord = { id: string; createdTime: string; fields: MaterialsFields };

// --------------------------------------------------------------------------
// Define the rows and columns
const tableFields = [
  {
    field: "identifier",
    headerName: "Material",
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
    headerName: "specification",
    flex: 1,
    renderCell: (params: any) => specificationCheckbox(params),
    renderHeader: (params: any) =>
      TooltipHeader(params, "Do we have a PDF data-sheet with the product's performance values? Yes/No"),
  },
  {
    field: "data_sheet",
    headerName: "Data Sheet",
    flex: 1,
    renderCell: (params: any) => datasheetCheckbox(params),
    renderHeader: (params: any) =>
      TooltipHeader(params, "Do we have a PDF data-sheet with the product's performance values? Yes/No"),
  },
  {
    field: "r_value",
    headerName: "R/Inch Value",
    flex: 1,
    renderHeader: (params: any) => TooltipHeader(params, "Do we have a product specification? Yes/No"),
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
function MaterialsDataGrid() {
  let { projectId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState<Array<MaterialsRecord>>(defaultRow);

  useEffect(() => {
    // Show modal if loading takes longer than 1s
    let timerId: NodeJS.Timeout;
    timerId = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    // Fetch the data from AirTable
    const fetchProjectData = async () => {
      const fetchedData = await fetchData(`${projectId}/materials`);
      const mergedData = fetchedData.reduce((acc: any[], item: any) => {
        // AirTable API returns the LAYER_MATERIAL_NAME as an array, even when it's a single value
        const existingItem = acc.find((x) => x.fields.LAYER_MATERIAL_NAME[0] === item.fields.LAYER_MATERIAL_NAME[0]);
        if (existingItem) {
          Object.assign(existingItem, item);
        } else {
          acc.push(item);
        }
        return acc;
      }, []);

      const newRows = mergedData.map((item: { id: string; fields: MaterialsFields }) => {
        item = datasheetRequired(item);
        return {
          id: item.id,
          identifier: item.fields.LAYER_MATERIAL_NAME,
          r_value: item.fields["MATERIAL RESISTIVITY [HR-FT2-F / BTU-IN]"],
          link: item.fields.LINK,
          specification: item.fields.SPECIFICATION,
          data_sheet: item.fields.DATA_SHEET,
          notes: item.fields.NOTES,
          flag: item.fields.FLAG,
        };
      });

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
        <h3>Materials:</h3>
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

export default MaterialsDataGrid;
