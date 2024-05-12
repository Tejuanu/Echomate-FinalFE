import { alpha } from '@mui/material/styles'
import { ComponentsOverridesProps } from '.'

// ----------------------------------------------------------------------

export default function Button(theme: ComponentsOverridesProps) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            boxShadow: "none",
          },
          fontWeight: theme.typography.fontWeightMedium,
          fontSize: theme.typography.subtitle2.fontSize,
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.action.hover,
        },
        sizeLarge: {
          height: 48,
        },
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z8,
          "&:hover": {
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {
          fontWeight: theme.typography.fontWeightMedium,
          fontSize: theme.typography.subtitle2.fontSize,
          color: 'white',
          boxShadow: "none",
          backgroundColor: theme.palette.text.btn,
          "&:hover": {
            backgroundColor: theme.palette.text.btn,
          },
        },
        containedSecondary: {
          boxShadow: theme.customShadows.secondary,
        },
        outlinedPrimary: {
          background: 'transparent',
          border: "1px solid",
          borderColor: theme.palette.divider,
          color: theme.palette.text.primary
        },
        outlinedInherit: {
          border: `1px solid ${alpha(theme.palette.grey[500], 0.32)}`,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
