// ----------------------------------------------------------------------

import { ComponentsOverridesProps } from '.'

export default function Autocomplete(theme: ComponentsOverridesProps) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.z20
        }
      }
    }
  }
}
