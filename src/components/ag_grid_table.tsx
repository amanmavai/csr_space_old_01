import React from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { ColDef } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

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
    <div className="ag-theme-alpine">
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
