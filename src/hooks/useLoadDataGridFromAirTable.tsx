import { useState, useEffect } from "react";
import { datasheetRequired } from "../components/common/CheckboxForDatasheet";
import fetchData from "../hooks/fetchAirTable";

/**
 * Custom hook for fetching DataGrid data from an AirTable Table.
 *
 * @param defaultRow - The default row data.
 * @param page - The page to fetch data for ('fans', 'appliances', etc.).
 * @param projectId - The project ID ('proj_2305', etc. ).
 * @returns An object containing the showModal state and rowData.
 */
const useLoadDataGridFromAirTable = (defaultRow: Array<any>, page: string, projectId?: string) => {
  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState<Array<any>>(defaultRow);

  useEffect(() => {
    if (!projectId) {
      return;
    }

    // Start the Model Timer
    let timerId: NodeJS.Timeout;
    timerId = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    const fetchProjectData = async () => {
      const fetchedData = await fetchData(`${projectId}/${page}`);

      // Use the AirTable record data as the row-data
      // Add the record ID as the row-ID
      const newRows = fetchedData.map((item: any) => {
        item = datasheetRequired(item);
        return { id: item.id, ...item.fields };
      });

      newRows.length > 0 ? setRowData(newRows) : setRowData(defaultRow);

      // Cancel the Model timer when the loading is done.
      clearTimeout(timerId);
      setShowModal(false);
    };

    fetchProjectData();
  }, [projectId]);

  return { showModal, rowData };
};

export default useLoadDataGridFromAirTable;
