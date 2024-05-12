import {
  Autocomplete,
  Box,
  InputAdornment,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { setSnack } from "src/redux/reducers/snack.reducer";
import { useNavigate } from "react-router-dom";

interface UserType {
  _id: string;
  displayName: string;
  email: string;
  label: string;
}

export default function SearchAutocomplete() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [options, setOptions] = useState<any>([]);
  const [value, setValue] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const socket = useAppSelector((state) => state.socket.socket);

  useEffect(() => {
    if (socket) {
      socket.on("search-users-response", (users: UserType[]) => {
        setOptions(users);
      });
      socket.on("search-users-error", (error) => {
        dispatch(setSnack({ open: true, message: error, type: "error" }));
      });
    }
  }, [socket, dispatch]);

  useEffect(() => {
    if (inputValue.length > 0 && socket) {
      socket.emit("search-users-request", inputValue);
    }
  }, [inputValue, socket]);

  return (
    <Box
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
          maxHeight: 40,
        },
        "& .MuiOutlinedInput-root": {
          p: 0,
          pl: 2,
          background: "#F0F2F5",
          borderRadius: 100,
          border: "none",
          maxHeight: 35,
        },
        "&.Mui-focused": {
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          border: "none",
        },
        "&:hover": {
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        },
        "& .MuiInputBase-root": {
          p: 0,
          pl: 2,
        },
        '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
          border: "none",
          p: 0,
          pl: 2,
        },
      }}
    >
      <Autocomplete
        options={options}
        open={options.length > 0 && inputValue.length > 0}
        filterOptions={(x: any) => {
          return x.filter((user: UserType) =>
            user.displayName.toLowerCase().includes(inputValue.toLowerCase())
          );
        }}
        renderOption={(_, option: any) => {
          return (
            <ListItemButton
              onClick={() => {
                navigate(`/profile/${option._id}`);
                setOptions([]);
                setValue(option.displayName)
              }}
            >
              <ListItemText
                primary={option?.displayName}
                secondary={option.email}
              />
            </ListItemButton>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search Echo mate"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="bi:search" />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250 }}
          />
        )}
        value={value}
        onChange={(_: any, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(_, value) => {
          setInputValue(value);
        }}
      />
    </Box>
  );
}
