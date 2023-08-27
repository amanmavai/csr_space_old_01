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

const drillDownOptions = {
  chart: {
    type: "column",
  },
  title: {
    text: "Basic drilldown",
  },
  xAxis: {
    type: "category",
  },

  legend: {
    enabled: false,
  },

  plotOptions: {
    series: {
      borderWidth: 0,
      dataLabels: {
        enabled: true,
      },
    },
  },

  series: [
    {
      name: "Things",
      colorByPoint: true,
      data: [
        {
          name: "Animals",
          y: 5,
          drilldown: "animals",
        },
        {
          name: "Fruits",
          y: 2,
          drilldown: "fruits",
        },
        {
          name: "Cars",
          y: 4,
          drilldown: "cars",
        },
        {
          name: "Stuff",
          y: 5,
          drilldown: "stuff",
        }
      ],
    },
  ],
  drilldown: {
    series: [
      {
        id: "animals",
        data: [
          ["Cats", 4],
          ["Dogs", 2],
          ["Cows", 1],
          ["Sheep", 2],
          ["Pigs", 1],
        ],
      },
      {
        id: "fruits",
        data: [
          ["Apples", 4],
          ["Oranges", 2],
        ],
      },
      {
        id: "cars",
        data: [
          ["Toyota", 4],
          ["Opel", 2],
          ["Volkswagen", 2],
        ],
      },
      {
        id: "stuff",
        data: [
          ["Pen", 4],
          ["Paper", 2],
          ["Bed", 2],
          ["Table", 12],
          ["Chair", 23],
        ],
      },
    ],
  },
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
        options={drillDownOptions}
        containerProps={{ id: "highchart_container", test_id: "highchart_testid" }}
        ref={ref}
        callback={(chart) => {
          console.log(chart);
        }}
      />
    </div>
  );
}
