import { Button, SxProps } from "@mui/material";

interface CustomButtonProps {
  onClick: () => void;
  label: string;
  index: number | string;
  value: number | string;
  sx?: SxProps;
}
export default function CustomButton({
  onClick,
  label,
  index,
  value,
  sx,
}: CustomButtonProps) {
  return (
    <Button
      size="small"
      color="primary"
      onClick={onClick}
      sx={{
        fontWeight: 400,
        color: value === index ? "white" : "text.color-text-clickable",
        border: "1px solid #E5E5E5",
        mr: 1,
        bgcolor: value === index ? "text.color-text-clickable" : "white",
        "&:hover": {
          bgcolor: value === index ? "text.color-text-clickable" : "white",
          color: value === index ? "white" : "text.color-text-clickable",
        },
        mb: 1,
        ...sx,
      }}
    >
      {label}
    </Button>
  );
}
