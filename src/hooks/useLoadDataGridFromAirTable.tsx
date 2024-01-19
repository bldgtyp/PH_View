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
function useLoadDataGridFromAirTable<T>(
  defaultRow: Array<any>,
  page: string,
  projectId?: string
): { showModal: boolean; rowData: any[] } {
  type AirTableRecord = {
    id: string;
    createdTime: string;
    fields: T;
  };

  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState<Array<any>>(defaultRow);

  useEffect(() => {
    if (!projectId) {
      return;
    }

    // Start the Model Timer
    const timerId: NodeJS.Timeout = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    const fetchProjectData = async () => {
      const fetchedData: AirTableRecord[] = await fetchData(`${projectId}/${page}`);

      // Use the AirTable record data as the row-data
      // Add the record ID as the row-ID
      const newRows: Record<string, any>[] = fetchedData.map((item) => {
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
}

export default useLoadDataGridFromAirTable;
