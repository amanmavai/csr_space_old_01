import React from "react";
import { getTotalRowCount, getFilteredRowCountValue } from "./ag_grid_table";
import { LabelValue } from "./components";
import { IStatusPanelParams } from "ag-grid-community";

export const CustomTotalAndFilteredRowCount = (props: IStatusPanelParams) => {
  const [totalCount, setTotalCount] = React.useState(0);
  const [filteredCount, setFilteredCount] = React.useState(0);

  React.useEffect(() => {
    props.api.addEventListener("modelUpdated", updateCounts);
    updateCounts();

    return () => {
      props.api.removeEventListener("modelUpdated", updateCounts);
    };
  }, [props.api]);

  function updateCounts() {
    setTotalCount(getTotalRowCount(props.api));
    setFilteredCount(getFilteredRowCountValue(props.api));
  }

  let value;
  if (filteredCount === totalCount) {
    value = `${totalCount}`;
  } else {
    value = `${filteredCount} of ${totalCount}`;
  }

  return <LabelValue label={props.label || "Rows"} value={value} className={"tw-py-2"} />;
};
