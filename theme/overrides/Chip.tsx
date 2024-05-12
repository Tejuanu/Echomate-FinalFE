export default function Chip() {
  return {
    MuiChip: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "&.MuiChip-outlined": {
            fontWeight: 600,
            fontSize: 14,
            border: "1px solid rgba(0, 0, 0, 0.1)",
          },
          "&.MuiChip-filled": {
            fontWeight: 600,
            fontSize: 14,
            border: "1px solid rgba(0, 0, 0, 0.1)",
          },
          "&.MuiChip-label": {
            color: "blue",
          },
        },
      },
    },
  };
}
