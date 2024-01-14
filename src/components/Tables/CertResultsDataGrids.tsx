import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import StyledDataGrid from "../../styles/DataGrid";
import { InfoTooltipCell, generateGridColumns } from "./DataGridItems";

type DataGridRow = {
  key: string;
  id: string;
  display_name: string;
  unit: string;
  [key: string]: any;
};

// --------------------------------------------------------------------------
// Define the rows and columns
const tableFields = [
  {
    key: "display_name",
    field: "display_name",
    headerName: "Name",
    flex: 1,
    renderCell: (params: any) => InfoTooltipCell(params),
  },
  {
    key: "unit",
    field: "unit",
    headerName: "Unit",
    flex: 0.5,
  },
];

function ResultDataGrid(props: { title: string; rowData: DataGridRow[] }) {
  const [columns, setColumns] = useState(generateGridColumns(tableFields));

  // Once the data is finished downloading and props is updated...
  useEffect(() => {
    // Add in the user-determined result columns, if any
    if (props.rowData.length > 0) {
      for (const [newKey] of Object.entries(props.rowData[0])) {
        if (newKey.includes("RESULT")) {
          // Make sure not to duplicate any columns
          const tableExistingColumnNames = tableFields.map((item) => item.key);
          if (!tableExistingColumnNames.includes(newKey)) {
            tableFields.push({
              key: newKey,
              field: newKey,
              headerName: newKey,
              flex: 1,
              renderCell: (num: any) => {
                if (num.row[newKey] !== undefined) {
                  return <>{num.row[newKey].toLocaleString()}</>;
                } else {
                  return <></>;
                }
              },
            });
          }
        }
      }
      setColumns(generateGridColumns(tableFields));
    }
  }, [props.rowData]);

  // --------------------------------------------------------------------------
  return (
    <>
      <Stack className="content-block-heading" spacing={1}>
        <h3>{props.title}:</h3>
      </Stack>
      <Box>
        <StyledDataGrid
          rows={props.rowData}
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
export default ResultDataGrid;
