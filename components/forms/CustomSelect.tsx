import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function CustomSelect({
  options,
  value,
  onChange,
  label,
}: {
  options: string[];
  value: string;
  label: string;
  onChange: (t: string) => void;
}) {
  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1">{label}</Typography>
      {": "}
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
        IconComponent={KeyboardArrowDownIcon}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((item: string, index: number) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
