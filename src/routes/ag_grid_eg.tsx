import React from "react";
import { AgGridTable } from "../components/ag_grid_table";

export function Component() {
  const gridRef = React.useRef(null); // for accessing grid api

  const [rowData, setRowData] = React.useState();

  // Each column definition results in one column
  const [columnDefs, setColumnDefs] = React.useState([
    { field: "make", filter: true },
    { field: "model", filter: "agMultiColumnFilter", menuTabs: ["filterMenuTab"] },
    { field: "price", filter: true },
  ]);

  // Example load data from server
  React.useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  return <AgGridTable ref={gridRef} rowData={rowData} columnDefs={columnDefs} />;
}
