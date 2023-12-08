```jsx
useEffect(() => {
  const H = props.highcharts || window.Highcharts;
  const constructorType = props.constructorType || 'chart';

  if (!H) {
    console.warn('The "highcharts" property was not passed.');
    return;
  }

  if (!H[constructorType]) {
    console.warn(
      'The "constructorType" property is incorrect or some required module is not imported.'
    );
    return;
  }

  if (!props.options) {
    console.warn('The "options" property was not passed.');
    return;
  }

  if (chartRef.current?.chart) {
    if (props.allowChartUpdate) {
      chartRef.current.update(props.options, ...(props.updateArgs || [true, true]));
      return;
    } else {
      chartRef.current.destroy();
      chartRef.current = null;
    }
  }

  if (!chartRef.current) {
    chartRef.current = H[constructorType](containerRef.current, props.options, props.callback);
  }

  return () => {
    chartRef.current?.destroy();
    chartRef.current = null;
  };
}, [props.options, props.allowChartUpdate, props.updateArgs, props.containerProps, props.highcharts, props.constructorType]);

```
