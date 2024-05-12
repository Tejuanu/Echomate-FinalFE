import { ComponentsOverridesProps } from ".";

export default function Dialog(theme: ComponentsOverridesProps) {
  return {
    MuiDialog: {
      defaultProps: {
        PaperProps: {
          sx: {
            overflow: "visible",
            borderRadius: "12px",
          },
        },
      },
    },
  };
}
