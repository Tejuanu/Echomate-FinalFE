import { alpha } from '@mui/material/styles'
import { ComponentsOverridesProps } from '.'

// ----------------------------------------------------------------------

export default function Backdrop(theme: ComponentsOverridesProps) {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[800], 0.8)
        },
        invisible: {
          background: 'transparent'
        }
      }
    }
  }
}
