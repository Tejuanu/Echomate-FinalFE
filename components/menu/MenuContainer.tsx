import {
  Box,
  ClickAwayListener,
  Popper,
  SxProps,
  PopperProps,
} from "@mui/material";

interface MenuContainerProps {
  children: any;
  sx?: SxProps;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  placement?: PopperProps["placement"];
}
export default function MenuContainer({
  children,
  sx,
  anchorEl,
  onClose,
  placement = "bottom-start",
}: MenuContainerProps) {
  return (
    <Popper
      sx={{
        zIndex: 1000,
      }}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      placement={placement}
    >
      <ClickAwayListener onClickAway={onClose}>
        <Box
          borderRadius={2}
          mt={1}
          overflow="hidden"
          border={1}
          borderColor='divider'
          boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
          bgcolor="background.paper"
          sx={sx}
        >
          {children}
        </Box>
      </ClickAwayListener>
    </Popper>
  );
}
