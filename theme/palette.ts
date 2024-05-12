import { alpha } from '@mui/material/styles'

// ----------------------------------------------------------------------

export const chartColors = [
  '#11B5AE',
  '#4046CA',
  '#F68512',
  '#DE3C82'
]

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24'
}

// const PRIMARY = {
//   lighter: '#D1E9FC',
//   light: '#76B0F1',
//   main: '#2065D1',
//   dark: '#103996',
//   darker: '#061B64',
//   contrastText: '#fff'
// }
const PRIMARY = {
  lighter: '#D1E9FC',
  light: '#76B0F1',
  main: '#111111',
  dark: '#103996',
  darker: '#061B64',
  contrastText: '#fff'
}

const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
  contrastText: '#fff'
}

const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff'
}

const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: GREY[800]
}

const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: GREY[800]
}

const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#fff'
}

export type PaletteType = {
  mode?: 'light' | 'dark';
  common: { black: string; white: string };
  primary: typeof PRIMARY;
  secondary: typeof SECONDARY;
  info: typeof INFO;
  success: typeof SUCCESS;
  warning: typeof WARNING;
  error: typeof ERROR;
  grey: typeof GREY;
  divider: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    btn: string;
    green: string;
    orange: string;
    blue: string;
    gray: string;
  };
  background: {
    paper: string;
    default: string;
    neutral: string;
    primary: string;
  };
  action: {
    active: string;
    hover: string;
    selected: string;
    disabled: string;
    disabledBackground: string;
    focus: string;
    hoverOpacity: number;
    disabledOpacity: number;
  };
};

const darkMode = {
  primary: {
    lighter: '#D1E9FC',
    light: '#76B0F1',
    main: '#111111',
    dark: '#103996',
    darker: '#061B64',
    contrastText: '#fff'
  },
  divider: alpha( '#fff', 0.24 ),
  text: {
    primary: '#fff',
    secondary: "#B8B8B8",
    disabled: 'rgba(255, 255, 255, 0.5)',
    btn: "#0265DC",
    green: "#007A4D",
    orange: "#E46F00",
    blue: "#0265DC",
    gray: "#565656",
  },
  action: {
    active: '#fff',
    hover: 'rgba(255, 255, 255, 0.08)',
    selected: 'rgba(255, 255, 255, 0.16)',
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    focus: alpha( GREY[500], 0.24 ),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
  background: {
    default: '#121212',
    paper: '#121212',
    neutral: GREY[200],
    "color-background-grey": "#F2F2F2",
    "color-brand-background": "#C1D443",
    "color-background-base": "#E5E5E5",
    primary: "#EAF6C0",
  }
}

const palette: PaletteType = {
  common: { black: "#000", white: "#fff" },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  text: {
    primary: "#111111",
    secondary: "#767676",
    disabled: GREY[500],
    btn: "#0265DC",
    green: "#007A4D",
    orange: "#E46F00",
    blue: "#0265DC",
    gray: "#565656",
  },
  background: {
    paper: "#fff",
    default: GREY[300],
    neutral: GREY[200],
    primary: "#EAF6C0",
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
export function generatePalette( mode: string ) {
  if ( mode === "dark" ) {
    return darkMode;
  }
  return palette;
}
