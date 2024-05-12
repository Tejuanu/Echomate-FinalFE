import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

export default function CustomIconButton({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <Tooltip arrow title={alt} placement="top">
      <IconButton sx={{ borderRadius: "4px" }} size="small">
        <img src={src} alt={alt} />
      </IconButton>
    </Tooltip>
  );
}
