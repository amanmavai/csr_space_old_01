import React from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { ColDef, GridApi, SortChangedEvent } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import "ag-grid-enterprise";

export type Ref = AgGridReact;
export const AgGridTable = React.forwardRef<Ref, AgGridReactProps>(function AgGridReactTable(props, gridRef) {
  const defaultColDef = React.useMemo<ColDef>(() => {
    return {
      sortable: true,
      resizable: true,
      menuTabs: [],
      useValueFormatterForExport: true,
      cellClass: "flex items-center",
      headerClass: "tw-uppercase tw-text-xs tw-font-medium",
    };
  }, []);

  return (
    <div className="ag-theme-alpine h-full w-full">
      <AgGridReact
        ref={gridRef}
        onGridReady={(params) => params.api.sizeColumnsToFit()}
        suppressMenuHide={true}
        animateRows={true}
        defaultColDef={defaultColDef}
        {...props}
      />
    </div>
  );
});

export function getFilteredRowCountValue(gridApi: GridApi) {
  let filteredRowCount = 0;
  gridApi.forEachNodeAfterFilter((node) => {
    if (!node.group) {
      filteredRowCount++;
    }
  });
  return filteredRowCount;
}

export function getTotalRowCount(gridApi: GridApi) {
  let totalRowCount = 0;
  gridApi.forEachNode((node) => {
    if (!node.group) {
      totalRowCount++;
    }
  });
  return totalRowCount;
}


 /**
   * columns for which we need to show aggregation component
   * @param {string[]} ColsToAggregate
   */
 export const getOnSortChanged = (ColsToAggregate: string[]) => (params: SortChangedEvent) => {
  const sortState = params.columnApi.getColumnState().find((x) => x.sort);
  if (sortState?.sort && ColsToAggregate.includes(sortState.colId)) {
    // clear prev range selection before applying new range selection
    params.api.clearRangeSelection();

    const filteredCount = getFilteredRowCountValue(params.api);
    params.api.addCellRange({
      rowStartIndex: 0,
      rowEndIndex: filteredCount - 1,
      columns: [sortState.colId],
    });
  } else {
    params.api.clearRangeSelection();
  }
}