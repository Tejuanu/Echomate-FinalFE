import { Box, SxProps } from "@mui/material";

export default function Card({ children, sx }: { children: React.ReactNode, sx?: SxProps }) {
  return (
    <Box p={3} border={1} borderColor="divider" bgcolor="background.paper" borderRadius={2} sx={{
        p: 3,
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        bgcolor: "background.paper",
        ...sx
    }}>
      {children}
    </Box>
  );
}
