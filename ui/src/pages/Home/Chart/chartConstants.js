import ReactDOMServer from 'react-dom/server'

// COMPONENTS
import CustomTooltip from './CustomTooltip'

// CONSTANTS
import { values } from 'constants/values'

// UTILS
import { abbreviateNumber } from 'utilities/number'

export const dummyChartList10 = [
  {
    'x': 1,
    'y': 16
  },
  {
    'x': 2,
    'y': 23
  },
  {
    'x': 3,
    'y': 73
  },
  {
    'x': 4,
    'y': 15
  },
  {
    'x': 5,
    'y': 75
  },
  {
    'x': 6,
    'y': 66
  },
  {
    'x': 7,
    'y': 68
  },
  {
    'x': 8,
    'y': 49
  },
  {
    'x': 9,
    'y': 63
  },
  {
    'x': 10,
    'y': 9
  }
]

export const dummyChartList30 = [
  {
    'x': 1,
    'y': 11
  },
  {
    'x': 2,
    'y': 54
  },
  {
    'x': 3,
    'y': 1
  },
  {
    'x': 4,
    'y': 94
  },
  {
    'x': 5,
    'y': 77
  },
  {
    'x': 6,
    'y': 88
  },
  {
    'x': 7,
    'y': 52
  },
  {
    'x': 8,
    'y': 92
  },
  {
    'x': 9,
    'y': 21
  },
  {
    'x': 10,
    'y': 67
  },
  {
    'x': 11,
    'y': 13
  },
  {
    'x': 12,
    'y': 38
  },
  {
    'x': 13,
    'y': 88
  },
  {
    'x': 14,
    'y': 8
  },
  {
    'x': 15,
    'y': 8
  },
  {
    'x': 16,
    'y': 82
  },
  {
    'x': 17,
    'y': 2
  },
  {
    'x': 18,
    'y': 53
  },
  {
    'x': 19,
    'y': 6
  },
  {
    'x': 20,
    'y': 8
  },
  {
    'x': 21,
    'y': 44
  },
  {
    'x': 22,
    'y': 99
  },
  {
    'x': 23,
    'y': 57
  },
  {
    'x': 24,
    'y': 1
  },
  {
    'x': 25,
    'y': 52
  },
  {
    'x': 26,
    'y': 73
  },
  {
    'x': 27,
    'y': 71
  },
  {
    'x': 28,
    'y': 15
  },
  {
    'x': 29,
    'y': 22
  },
  {
    'x': 30,
    'y': 26
  }
]

export const dummyChartList50 = [
  {
    'x': 1,
    'y': 58
  },
  {
    'x': 2,
    'y': 4
  },
  {
    'x': 3,
    'y': 12
  },
  {
    'x': 4,
    'y': 18
  },
  {
    'x': 5,
    'y': 36
  },
  {
    'x': 6,
    'y': 65
  },
  {
    'x': 7,
    'y': 62
  },
  {
    'x': 8,
    'y': 28
  },
  {
    'x': 9,
    'y': 95
  },
  {
    'x': 10,
    'y': 30
  },
  {
    'x': 11,
    'y': 55
  },
  {
    'x': 12,
    'y': 52
  },
  {
    'x': 13,
    'y': 7
  },
  {
    'x': 14,
    'y': 21
  },
  {
    'x': 15,
    'y': 44
  },
  {
    'x': 16,
    'y': 41
  },
  {
    'x': 17,
    'y': 37
  },
  {
    'x': 18,
    'y': 77
  },
  {
    'x': 19,
    'y': 69
  },
  {
    'x': 20,
    'y': 73
  },
  {
    'x': 21,
    'y': 81
  },
  {
    'x': 22,
    'y': 63
  },
  {
    'x': 23,
    'y': 60
  },
  {
    'x': 24,
    'y': 61
  },
  {
    'x': 25,
    'y': 83
  },
  {
    'x': 26,
    'y': 1
  },
  {
    'x': 27,
    'y': 11
  },
  {
    'x': 28,
    'y': 77
  },
  {
    'x': 29,
    'y': 53
  },
  {
    'x': 30,
    'y': 40
  },
  {
    'x': 31,
    'y': 15
  },
  {
    'x': 32,
    'y': 4
  },
  {
    'x': 33,
    'y': 3
  },
  {
    'x': 34,
    'y': 91
  },
  {
    'x': 35,
    'y': 7
  },
  {
    'x': 36,
    'y': 68
  },
  {
    'x': 37,
    'y': 89
  },
  {
    'x': 38,
    'y': 82
  },
  {
    'x': 39,
    'y': 62
  },
  {
    'x': 40,
    'y': 14
  },
  {
    'x': 41,
    'y': 58
  },
  {
    'x': 42,
    'y': 11
  },
  {
    'x': 43,
    'y': 21
  },
  {
    'x': 44,
    'y': 87
  },
  {
    'x': 45,
    'y': 90
  },
  {
    'x': 46,
    'y': 52
  },
  {
    'x': 47,
    'y': 4
  },
  {
    'x': 48,
    'y': 17
  },
  {
    'x': 49,
    'y': 53
  },
  {
    'x': 50,
    'y': 40
  }
]

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
        borderRadius: 10,
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