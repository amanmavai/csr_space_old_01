import React from "react";
import * as Highcharts from "highcharts";
// import highchart modules
import Drilldown from "highcharts/modules/drilldown";

// Extend Highcharts with modules
export function extendHighchartsWithModules(modules: any[]) {
  modules.forEach(function (module) {
    module(Highcharts);
  });
}

// call this function to perform module loading
extendHighchartsWithModules([Drilldown]);

// https://github.com/highcharts/highcharts-react
export interface HighchartsRefObject {
  chartRef: Highcharts.Chart;
  containerRef: React.RefObject<HTMLDivElement>;
}

interface Props {
  /* *
   *
   *  Properties
   *
   * */

  /**
   * Indexer for custom properties
   */
  [key: string]: any;

  /**
   * Flag for `Chart.update` call (Default: true)
   */
  allowChartUpdate?: boolean;

  /**
   * Reference to the chart factory (Default: chart)
   */
  constructorType?: keyof typeof Highcharts;

  /**
   * Properties of the chart container
   */
  containerProps?: Record<string, any>;

  /**
   * Highcharts namespace
   */
  highcharts?: typeof Highcharts;

  /**
   * Immutably recreates the chart on receiving new props
   */
  immutable?: boolean;

  /**
   * Highcharts options
   */
  options?: Highcharts.Options;

  /**
   * Flags for `Chart.update` call: redraw, oneToOne, and animation. (Default:
   * [true, true, true])
   */
  updateArgs?: [boolean] | [boolean, boolean] | [boolean, boolean, boolean];

  /* *
   *
   *  Functions
   *
   * */

  /**
   * Callback for the chart factory
   */
  callback?: Highcharts.ChartCallbackFunction;
}

// React currently throws a warning when using `useLayoutEffect` on the server.
// To get around it, we can conditionally `useEffect` on the server (no-op) and
// `useLayoutEffect` in the browser. We need `useLayoutEffect` to ensure the
// `Highcharts` ref is available in the layout phase. This makes it available
// in a parent component's `componentDidMount`.
const useIsomorphicLayoutEffect = typeof document !== "undefined" ? React.useLayoutEffect : React.useEffect;

const HighchartsReact = React.forwardRef<HighchartsRefObject, Props>(function HighchartsReact(props, ref) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const chartRef = React.useRef<Highcharts.Chart>();

  // this effect runs every time the props update for this component in the deps array,
  useIsomorphicLayoutEffect(() => {
    function createChart() {
      const H = Highcharts;
      const constructorType = props.constructorType || "chart";

      if (!H[constructorType]) {
        console.warn('The "constructorType" property is incorrect or some required module is not imported.');
      } else if (!props.options) {
        console.warn('The "options" property was not passed.');
      } else {
        // because of above checks, in this block we have all of them available (H[constructorType], props.options)
        // Create a chart
        chartRef.current = H[constructorType](
          containerRef.current,
          props.options,
          props.callback ? props.callback : undefined
        );
      }
    }

    // when chartRef has no value, create the chart and populate it.
    if (!chartRef.current) {
      createChart();
    } else {
      // default for allowChartUpdate is true
      let { allowChartUpdate = true } = props;
      if (allowChartUpdate) {
        if (props.immutable) {
          // when props.immutable is true then create new chart on every update
          createChart();
        } else {
          if (!props.options) {
            console.warn('The "options" property was not passed.');
            return;
          }
          chartRef.current.update(props.options, ...(props.updateArgs || [true, true]));
        }
      }
    }
  }, [props.options, props.allowChartUpdate, props.updateArgs, props.constructorType, props.callback]);

  useIsomorphicLayoutEffect(() => {
    return () => {
      // Destroy chart only if unmounting.
      if (chartRef.current) {
        chartRef.current.destroy();
        // @ts-ignore
        chartRef.current = null;
      }
    };
  }, []);

  React.useImperativeHandle(
    ref,
    () => ({
      get chartRef() {
        return chartRef.current as Highcharts.Chart;
      },
      get containerRef() {
        return containerRef;
      },
    }),
    []
  );

  // Create container for the chart
  return <div {...props.containerProps} ref={containerRef} />;
});

export default React.memo<Props>(HighchartsReact);
