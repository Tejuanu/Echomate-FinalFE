export default function Tab() {
  return {
    MuiTab: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          minHeight: 20,
          minWidth: 0,
          padding: "4px 2px",
          fontWeight: "600",
          fontSize: 16,
        },
      },
    },
  };
}
