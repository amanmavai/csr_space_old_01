import React from "react";
import { AgGridTable, getOnSortChanged } from "../components/ag_grid_table";
import { ColDef, StatusPanelDef } from "ag-grid-community";
import { CustomTotalAndFilteredRowCount } from "../components/ag_grid_utils";

export function Component() {
  const gridRef = React.useRef(null); // for accessing grid api

  const [rowData, setRowData] = React.useState();

  // Each column definition results in one column
  const [columnDefs, setColumnDefs] = React.useState<ColDef[]>([
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

  const statusBar = React.useMemo<{
    statusPanels: StatusPanelDef[];
  }>(() => {
    return {
      statusPanels: [
        {
          statusPanel: CustomTotalAndFilteredRowCount,
          statusPanelParams: {
            label: "Row Items",
          },
          align: "left",
        },
        {
          statusPanel: "agAggregationComponent",
          statusPanelParams: {
            aggFuncs: ["avg", "min", "max"],
          },
        },
      ],
    };
  }, []);

  return (
    <AgGridTable
      ref={gridRef}
      rowData={rowData}
      columnDefs={columnDefs}
      enableRangeSelection
      onSortChanged={getOnSortChanged(["price"])}
      statusBar={statusBar}
    />
  );
}
