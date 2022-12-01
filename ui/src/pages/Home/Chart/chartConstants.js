import ReactDOMServer from 'react-dom/server'

// COMPONENTS
import CustomTooltip from './CustomTooltip'

// CONSTANTS
import { values } from 'constants/values'

// UTILS
import { abbreviateNumber } from 'utilities/number'

export const getTransactionChartOptions = (
  inputTheme, 
  inputTitle, 
  inputXList,
  inputYList,
) => {
  return {
    chart: {
      animations: {
        enabled: false,
      },
      fontFamily: values.fontFamilyDmMono,
      foreColor: inputTheme.palette.text.primary,
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: false,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: false,
        },
      },
      type: 'bar',
      zoom: {
        enabled: true,
        type: 'x',  
        autoScaleYaxis: false,
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -24,
      style: {
        fontSize: '12px',
        colors: [ inputTheme.palette.text.primary ],
        fontWeight: 400,
      },
      formatter: function (value) {
        if (value === Math.min(...inputYList)) return `min ${value}`
        else if (value === Math.max(...inputYList)) return `max ${value}`
        else return ''
      },
    },
    fill: {
      colors: [ inputTheme.palette.common.white ],
      opacity: 1,
    },
    plotOptions: {
      bar: {
        borderRadius: 15,
        columnWidth: '75%',
        borderRadiusApplication: 'end',
        endingShape: 'rounded',
        horizontal: false,
        dataLabels: {
          position: 'top',
        },
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: [ 'red' ],
    },
    tooltip: {
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        return ReactDOMServer.renderToString(
          <CustomTooltip
            xList={inputXList}
            yList={inputYList}
            dataPointIndex={dataPointIndex}
            theme={inputTheme}
            title={inputTitle}
          />
        )
      }
    },
    xaxis: {
      categories: inputXList,
      labels: {
        style: {
          fontSize: 14,
        },
      },
      tickPlacement: 'on',
    },
    yaxis: {
      forceNiceScale: true,
      max: function(max) { return max * 1.1 },
      labels: {
        style: {
          fontSize: 14,
        },
        formatter: function(value, index) {
          return abbreviateNumber(value)
        },
      },
      title: {
        text: inputTitle,
        style: {
          fontSize: 14,
          fontWeight: 500,
        },
      },
    },
  }
}

export const getTransactionChartSeries = (inputTitle, inputYList) => {
  return [
    {
      name: inputTitle,
      data: inputYList,
    },
  ]
}