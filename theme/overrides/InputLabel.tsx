import { ComponentsOverridesProps } from '.'

export default function InputLabel(theme: ComponentsOverridesProps) {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          '&.Mui-focused': {
            color: theme.palette.text.primary
          },
          fontWeight: 600,
          marginBottom: 8,
          fontSize: 16
        }
      }
    }
  }
}
