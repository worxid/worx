export const values = {
  // ALL PAGES
  fontFamilyDmMono: [ 'DM Mono', 'monospace', 'sans-serif' ].join(','),
  fontFamilySpaceMono: [ 'Space Mono', 'monospace', 'sans-serif' ].join(','),
  zoomBoundary: '@media only screen and (max-height: 800px) and (min-width: 1200px)',

  // DRAWER
  drawerWidth: 256,
  drawerWidthOnMinimized: 72,

  // FLYOUT
  flyoutWidth: 400,

  // SNACKBAR
  initialSnackbarObject: {
    open: false,
    severity: 'success',
    title: '',
    message: '',
  },

  // COLORS
  colorsCst: ['#E2523E', '#D87972', '#D43A64', '#E26C92', '#9036AD', '#AF6DC3', '#6041AD', '#795BBA', 
    '#4052B4', '#7A87C7', '#4397F2', '#77B3EC', '#46A8F4', '#6BC3F3', '#51B9CE', '#70D1DC',
    '#419489', '#68B5A8', '#67AC5B', '#8FC586', '#99C057', '#B6D28D', '#D2DB59', '#E0E48B',
    '#FCE95E', '#FDF184', '#F6C043', '#F9D669', '#F29938', '#F5B660', '#EC6036', '#F08C6D',
    '#735748', '#9E887E', '#9E9E9E', '#E0E0E0', '#667C8A', '#93A4AD', '#010002', '#424242'
  ],

  // ZOOM
  zoomValue: 0.85
}