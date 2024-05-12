// ----------------------------------------------------------------------
import { ComponentsOverridesProps } from '.'

export default function Typography(theme: ComponentsOverridesProps) {
  return {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2)
        },
        gutterBottom: {
          marginBottom: theme.spacing(1)
        }
      }
    }
  }
}
