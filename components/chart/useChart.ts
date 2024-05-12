import merge from 'lodash/merge';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import { ThemeOptionTypes } from 'theme/index';

// ----------------------------------------------------------------------
export const colors: string[] = [
  "#111111",
  "#FFC107",
  "#1890FF",
  "#FF4842",
  "#54D62C",
  "#B78103",
  "#08660D",
  "#0C53B7",
  "#04297A",
];
const commonOptions = {
  labels: {
    style: {
      colors: colors,
      fontSize: "12px",
    },
  },
  // yaxis: {
  //   min: 0,
  //   max: 100,
  // },
  plotOptions: {
    bar: {
      columnWidth: "20%",
      distributed: true,
      borderRadius: 4,
    },
  },
  noData: {
    text: "No Data",
  },
};
export default function useChart( options: any ) {
  const theme: ThemeOptionTypes = useTheme();
  const LABEL_TOTAL = {
    show: true,
    label: "Total",
    color: "black",
    fontWeight: 600,
    fontSize: 24,
    lineHeight: theme.typography.subtitle2.lineHeight,
    // color: theme.palette.text.secondary,
    // fontSize: theme.typography.subtitle2.fontSize,
    // fontWeight: theme.typography.subtitle2.fontWeight,
    // formatter: ( val: any ) => {
    //   console.log( val )
    //   // return parseInt( val );
    //   return val;
    // }
  };

  const LABEL_VALUE = {
    offsetY: 8,
    color: theme.palette.text.primary,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    lineHeight: theme.typography.h3.lineHeight,
  };

  const baseOptions = {
    // Colors
    // colors: [
    //   theme.palette.primary.main,
    //   theme.palette.warning.main,
    //   theme.palette.info.main,
    //   theme.palette.error.main,
    //   theme.palette.success.main,
    //   theme.palette.warning.dark,
    //   theme.palette.success.darker,
    //   theme.palette.info.dark,
    //   theme.palette.info.darker,
    // ],
    colors: [
      "#ed2d2d",
      "#FFC107",
      "#1890FF",
      "#FF4842",
      "#54D62C",
      "#B78103",
      "#08660D",
      "#0C53B7",
      "#04297A",
    ],

    // Chart
    chart: {
      toolbar: { show: true },
      zoom: { enabled: true },
      // animations: { enabled: false },
      foreColor: theme.palette.text.disabled,
      fontFamily: theme.typography.fontFamily,
    },

    //zoom
    zoom: {
      type: "xy",
    },

    // States
    states: {
      hover: {
        filter: {
          type: "lighten",
          value: 0.04,
        },
      },
      active: {
        filter: {
          type: "darken",
          value: 0.88,
        },
      },
    },

    // Fill
    fill: {
      opacity: 1,
      gradient: {
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },

    // Datalabels
    dataLabels: { enabled: false },

    // Stroke
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round",
    },

    // Grid
    grid: {
      show: false,
      strokeDashArray: 3,
      borderColor: theme.palette.divider,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },

    // Xaxis
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    // Markers
    // markers: {
    //   size: 0,
    //   strokeColors: theme.palette.background.paper,
    // },

    // Tooltip
    tooltip: {
      x: {
        show: false,
      },
    },

    // Legend
    legend: {
      show: true,
      fontSize: String(13),
      position: "right",
      horizontalAlign: "right",
      markers: {
        radius: 12,
      },
      fontWeight: 500,
      itemMargin: { horizontal: 12 },
      labels: {
        colors: theme.palette.text.primary,
      },
    },

    // plotOptions
    plotOptions: {
      // Bar
      bar: {
        borderRadius: 4,
        columnWidth: "28%",
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },

      // Pie + Donut
      // pie: {
      //   donut: {
      //     labels: {
      //       show: true,
      //       value: LABEL_VALUE,
      //       total: LABEL_TOTAL,
      //     },
      //   },
      // },

      // Radialbar
      radialBar: {
        track: {
          strokeWidth: "100%",
          background: alpha(theme.palette.grey[500], 0.16),
        },
        dataLabels: {
          value: LABEL_VALUE,
          total: LABEL_TOTAL,
        },
      },

      // Radar
      radar: {
        polygons: {
          fill: { colors: ["transparent"] },
          strokeColors: theme.palette.divider,
          connectorColors: theme.palette.divider,
        },
      },

      // polarArea
      polarArea: {
        rings: {
          strokeColor: theme.palette.divider,
        },
        spokes: {
          connectorColors: theme.palette.divider,
        },
      },
    },

    // Responsive
    responsive: [
      {
        // sm
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: { bar: { columnWidth: "40%" } },
        },
      },
      {
        // md
        breakpoint: theme.breakpoints.values.md,
        options: {
          plotOptions: { bar: { columnWidth: "32%" } },
        },
      },
    ],
  };

  return merge( baseOptions, commonOptions, options );
  // return options
}
