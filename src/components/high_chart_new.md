```jsx
import React, { useEffect, useRef } from 'react';

const HighchartsReact = (props) => {
  const chartRef = useRef(null);
  const containerRef = useRef(null);

  // useEffect for initialization and cleanup
  useEffect(() => {
    const H = props.highcharts || window.Highcharts;

    if (!H || typeof H !== 'object') {
      console.warn('The "highcharts" property was not passed or is not valid.');
      return;
    }

    const constructorType = props.constructorType || 'chart';
    if (!H[constructorType]) {
      console.warn('The "constructorType" property is incorrect or some required module is not imported.');
      return;
    }

    if (!props.options || typeof props.options !== 'object') {
      console.warn('The "options" property was not passed or is not valid.');
      return;
    }

    if (containerRef.current) {
      chartRef.current = H[constructorType](containerRef.current, props.options, props.callback);
    } else {
      console.warn('The container for Highcharts is not available.');
    }

    // Cleanup function to avoid memory leaks
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []); // This effect runs only on mount and unmount

  // useEffect for handling chart updates
  useEffect(() => {
    if (chartRef.current && props.allowChartUpdate) {
      // Updating the chart instance, not creating a new one
      chartRef.current.update(props.options, ...(props.updateArgs || [true, true]));
    }
  }, [props.options, props.allowChartUpdate, props.updateArgs]);

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

  return <div ref={containerRef}></div>;
};

export default HighchartsReact;

```
