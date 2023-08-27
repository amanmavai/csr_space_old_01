import React from "react";
import HighchartsReact, { HighchartsRefObject } from "@/components/highchart_utils";
import { Button } from "@/components/ui/button";
import * as Highcharts from "highcharts";

const options: Highcharts.Options = {
  title: {
    text: "Unemployment rates in engineering and ICT subjects, 2021",
    align: "left",
  },
  subtitle: {
    text:
      "Chart option: Plain | Source: " +
      '<a href="https://www.nav.no/no/nav-og-samfunn/statistikk/arbeidssokere-og-stillinger-statistikk/helt-ledige"' +
      'target="_blank">NAV</a>',
    align: "left",
  },
  colors: [
    "#4caefe",
    "#3fbdf3",
    "#35c3e8",
    "#2bc9dc",
    "#20cfe1",
    "#16d4e6",
    "#0dd9db",
    "#03dfd0",
    "#00e4c5",
    "#00e9ba",
    "#00eeaf",
    "#23e274",
  ],
  xAxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  series: [
    {
      type: "column",
      name: "Unemployed",
      borderRadius: 5,
      colorByPoint: true,
      data: [5412, 4977, 4730, 4437, 3947, 3707, 4143, 3609, 3311, 3072, 2899, 2887],
      showInLegend: false,
    },
  ],
};

export function Component() {
  const ref = React.useRef<HighchartsRefObject>();

  function handleClick() {
    // capture chart ref object (perform any chart related operations using this ref)
    const chartRef = ref.current?.chartRef;

    chartRef?.update({
      chart: {
        inverted: true,
        polar: false,
      },
      subtitle: {
        text:
          "Chart option: Plain | Source: " +
          '<a href="https://www.nav.no/no/nav-og-samfunn/statistikk/arbeidssokere-og-stillinger-statistikk/helt-ledige"' +
          'target="_blank">NAV</a>',
      },
    });

    // capture chart container ref object
    const containerRef = ref.current?.containerRef;
  }
  return (
    <div>
      <Button onClick={handleClick}>Update Chart</Button>
      <HighchartsReact
        options={options}
        containerProps={{ id: "highchart_container", test_id: "highchart_testid" }}
        ref={ref}
        callback={(chart) => {
          console.log(chart);
        }}
      />
    </div>
  );
}
