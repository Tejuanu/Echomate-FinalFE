import {
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AvatarComponent from "components/avatar/AvatarComponent";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import React from "react";
import { Image } from "antd";
import { convertFileToDataURL } from "utils/functions/helper";
import { get } from "lodash";
import axios from "axios";
import { setSnack } from "src/redux/reducers/snack.reducer";

export default function CreatePostComponent() {
  const dispatch = useAppDispatch();
  const [showMediaDialog, setShowMediaDialog] = React.useState(false);
  const [media, setMedia] = React.useState(null);
  const [value, setValue] = React.useState<string>("");
  const photoInputRef = React.useRef<HTMLInputElement>(null);
  const videoInputRef = React.useRef<HTMLInputElement>(null);
  const { user, socket } = useAppSelector((state) => ({
    user: state.auth.user,
    socket: state.socket.socket,
  }));

  async function handleCreatePost() {
    try {
      setShowMediaDialog(false);
      let obj: any = {
        content: value,
        type: "text",
        text: value,
        owner: user._id,
      };
      if (media) {
        const formData = new FormData();
        formData.append("file", media.file);
        const { data } = await axios.post(
          `${import.meta.env.VITE_server}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        obj = {
          ...obj,
          type: media.type.includes("image")
            ? "image"
            : media.type.includes("video")
            ? "video"
            : "text",
          content: data.fileUrl,
        };
      }
      socket.emit("create-post", obj);
      setValue("");
    } catch (error) {
      dispatch(setSnack({ open: true, message: error.message, type: "error" }));
    }
  }

  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 1, mb: 2 }}>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={showMediaDialog}
        onClose={() => {
          setShowMediaDialog(false);
          setMedia(null);
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: "divider",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Upload media</Typography>
          <IconButton
            onClick={() => {
              setShowMediaDialog(false);
              setMedia(null);
            }}
          >
            <Icon icon="ic:sharp-close" />
          </IconButton>
        </Stack>
        {media && (
          <>
            {media.type.includes("image") ? (
              <Image
                src={media.url}
                width="100%"
                height={300}
                preview={false}
              />
            ) : (
              <video src={media.url} width="100%" height={300} controls></video>
            )}
          </>
        )}
        <Box p={2}>
          <OutlinedInput
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreatePost();
              }
            }}
            fullWidth
            placeholder="Type a message"
          />
        </Box>
      </Dialog>
      <input
        type="file"
        ref={photoInputRef}
        accept="image/*"
        style={{ display: "none" }}
        id="image"
        onChange={async (e) => {
          const file = get(e, "target.files[0]", null);
          if (file) {
            const url = await convertFileToDataURL(file);
            setMedia({
              url,
              type: file.type,
              file,
            });
            setShowMediaDialog(true);
          }
        }}
      />
      <input
        type="file"
        ref={videoInputRef}
        accept="video/*"
        style={{ display: "none" }}
        id="video"
        onChange={async (e) => {
          const file = get(e, "target.files[0]", null);
          try {
            if (file) {
              const url = await convertFileToDataURL(file);
              setMedia({
                url,
                type: file.type,
                file,
              });
              setShowMediaDialog(true);
            }
          } catch (error) {
            console.log(error.message);
          }
        }}
      />
      <Stack spacing={2} direction="row" alignItems="center">
        <AvatarComponent />
        <input
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          type="text"
          style={{
            borderRadius: "100px",
            border: "none",
            width: "100%",
            background: "#F0F2F5",
            padding: 12,
            paddingLeft: 16,
            fontSize: 16,
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              socket.emit("create-post", {
                content: e.currentTarget.value,
                type: "text",
                text: e.currentTarget.value,
                owner: user._id,
              });
              setValue("");
            }
          }}
          placeholder={`What's on your mind, ${user.displayName}?`}
        />
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Stack
        direction={"row"}
        alignItems="center"
        justifyContent={"space-around"}
      >
        <Button
          startIcon={
            <Icon
              icon="mdi:video-outline"
              style={{ color: "red", fontSize: 30 }}
            />
          }
          onClick={() => videoInputRef.current.click()}
          variant="text"
          sx={{
            color: "text.secondary",
            fontWeight: 700,
            fontSize: 16,
            bgcolor: "transparent",
          }}
        >
          Video
        </Button>
        <Button
          onClick={() => photoInputRef.current.click()}
          variant="text"
          startIcon={
            <Icon
              icon="f7:photo-fill"
              style={{ color: "#45BD62", fontSize: 25 }}
            />
          }
          sx={{
            color: "text.secondary",
            fontWeight: 700,
            fontSize: 16,
            bgcolor: "transparent",
          }}
        >
          Photo
        </Button>
        <Button
          variant="text"
          startIcon={
            <Icon
              icon="mingcute:emoji-fill"
              style={{ color: "#F7B928", fontSize: 30 }}
            />
          }
          sx={{
            color: "text.secondary",
            fontWeight: 700,
            fontSize: 16,
            bgcolor: "transparent",
          }}
        >
          Live Video
        </Button>
      </Stack>
    </Paper>
  );
}
