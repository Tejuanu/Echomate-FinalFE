// ----------------------------------------------------------------------

import { ComponentsOverridesProps } from '.'

export default function Table(theme: ComponentsOverridesProps) {
  return {
    MuiTableCell: {
      styleOverrides: {
        // head: {
        //   color: theme.palette.text.secondary,
        //   backgroundColor: theme.palette.background.neutral
        // }
      },
    },
  };
}
