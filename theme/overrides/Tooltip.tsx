// ----------------------------------------------------------------------
import { ComponentsOverridesProps } from '.'

export default function Tooltip(theme: ComponentsOverridesProps) {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.grey[800]
        },
        arrow: {
          color: theme.palette.grey[800]
        }
      }
    }
  }
}
