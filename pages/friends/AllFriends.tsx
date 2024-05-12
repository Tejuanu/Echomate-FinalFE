import {
  Avatar,
  Box,
  Container,
  Dialog,
  Fab,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Icon } from "@iconify/react";
import moment from "moment";
// import bgImg from "assets/background.jpg";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import {
  convertFileToDataURL,
  scrollToBottom,
  scrollToTop,
} from "utils/functions/helper";
import { get } from "lodash";
import { setSnack } from "src/redux/reducers/snack.reducer";
import { useNavigate } from "react-router-dom";
import { Image } from "antd";
import axios from "axios";

interface CustomListItemProps {
  name: string;
  email: string;
  selected: boolean;
  onClick: () => void;
}

function CustomListItem({
  name,
  email,
  onClick,
  selected,
}: CustomListItemProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ListItemButton
      onClick={onClick}
      selected={selected}
      // sx={{
      //   "&.Mui-selected": {
      //     backgroundColor: "rgba(255, 255, 255, 0.2)",
      //   },
      // }}
    >
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Remove User</MenuItem>
      </Menu>
      <ListItemAvatar>
        <Avatar sx={{}}>
          <Icon icon="ion:person" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={email} />
      {/* <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handleClick(e);
        }}
      >
        <Icon icon="ant-design:more-outlined" />
      </IconButton> */}
    </ListItemButton>
  );
}

export default function AllFriends() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showScrollTop, setshowScrollTop] = React.useState(false);
  const [showScrollBottom, setshowScrollBottom] = React.useState(false);
  const [chatMessage, setChatMessage] = React.useState("");
  const {
    auth,
    socket: { socket },
  } = useAppSelector((state) => ({
    auth: state.auth,
    socket: state.socket,
  }));
  const [chats, setChats] = React.useState<any[]>([]);
  const [activeUser, setActiveUser] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [showMediaDialog, setShowMediaDialog] = React.useState(false);
  const [media, setMedia] = React.useState<any>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const photoInputRef = React.useRef<HTMLInputElement>(null);
  const videoInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (socket) {
      socket.on("get-messages-error", (data) => {
        dispatch(setSnack({ type: "error", message: data, open: true }));
      });
      socket.on("send-message-error", (data) => {
        dispatch(setSnack({ type: "error", message: data, open: true }));
      });
      socket.on("get-messages-response", (data) => {
        setChats(data);
        scrollToBottom("chat-container");
      });
      socket.on("send-message-response", (data) => {
        setChats((prev) => [...prev, data]);
        scrollToBottom("chat-container");
      });
    }
    return () => {
      if (socket) {
        socket.off("get-messages-error");
        socket.off("get-messages-response");
        socket.off("send-message-response");
      }
    };
  }, [socket, auth.user, dispatch]);

  React.useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    chatContainer?.addEventListener("scroll", (_) => {
      const { scrollTop } = chatContainer;
      if (scrollTop > 100) {
        setshowScrollTop(true);
        setshowScrollBottom(false);
      } else {
        setshowScrollTop(false);
        setshowScrollBottom(true);
      }
    });
    return () => {
      chatContainer?.removeEventListener("scroll", (_) => {
        // setScrollTop(chatContainer.scrollTop);
      });
    };
  }, []);
  const handleActiveUser = async (email: string) => {
    setActiveUser(email);
    navigate(`/all-friends?selected=${email}`);
    socket.emit("get-messages-request", {
      sender: auth.user?.email,
      receiver: email,
    });
    scrollToBottom("chat-container");
  };

  async function handleChatMessage(data: any) {
    let chatObj: any = {
      sender: auth.user?.email,
      receiver: activeUser,
      message: data,
      type: "text",
    };
    if (media) {
      chatObj = {
        ...chatObj,
        media: {
          type: media?.type,
          file: media?.file,
          name: media?.file?.name,
        },
        type: media?.type?.includes("image")
          ? "image"
          : media?.type?.includes("video")
          ? "video"
          : "text",
      };
      try {
        const formData = new FormData();
        formData.append("file", media.file);
        const { data } = await axios.post(
          "http://localhost:8000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        chatObj = {
          ...chatObj,
          type: media.type,
          media: data.fileUrl,
        };
      } catch (error) {
        dispatch(
          setSnack({ type: "error", message: error.message, open: true })
        );
      }
    }
    console.log(chatObj)
    socket.emit("send-message-request", chatObj);
    setChatMessage("");
    setShowMediaDialog(false);
    setMedia(null);
    scrollToBottom("chat-container");
  }

  return (
    <div>
      <Stack
        direction="row"
        sx={{
          // backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
        }}
      >
        <Paper
          sx={{
            minHeight: "calc(100vh - 64px )",
            maxWidth: "300px",
            width: "100%",
            borderRadius: 0,
            borderRight: 1,
            borderColor: "divider",
          }}
        >
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
            }}
          >
            {auth.user.friends.map((user) => (
              <CustomListItem
                key={`${user.email}`}
                selected={activeUser === user.email}
                onClick={() => handleActiveUser(`${user.email}`)}
                name={`${user.displayName}`}
                email={`${user.email}`}
              />
            ))}
          </List>
        </Paper>
        {auth.users.length > 0 ? (
          <Box
            sx={{
              minHeight: "calc(100vh - 74px)",
              width: "100%",
              position: "relative",
            }}
          >
            {activeUser ? (
              <>
                <Box
                  id="chat-container"
                  sx={{
                    width: "100%",
                    maxHeight: "calc(100vh - 150px)",
                    overflowY: "auto",
                  }}
                >
                  {showScrollTop && (
                    <Tooltip title="Scroll to top" arrow>
                      <Fab
                        onClick={() => scrollToTop("chat-container")}
                        color="primary"
                        size="small"
                        aria-label="add"
                        sx={{
                          position: "fixed",
                          bottom: 100,
                          right: 20,
                          borderRadius: "8px",
                          bgcolor: "rgba(255, 255, 255, 0.8)",
                          color: "black",
                          "&:hover": {
                            bgcolor: "rgba(255, 255, 255, 0.8)",
                          },
                        }}
                      >
                        <Icon icon="ph:arrow-up-bold" />
                      </Fab>
                    </Tooltip>
                  )}
                  {showScrollBottom && (
                    <Tooltip title="Scroll to Bottom" arrow>
                      <Fab
                        onClick={() => scrollToBottom("chat-container", 0)}
                        color="primary"
                        size="small"
                        aria-label="add"
                        sx={{
                          position: "fixed",
                          bottom: 100,
                          right: 20,
                          borderRadius: "8px",
                          bgcolor: "rgba(255, 255, 255, 0.8)",
                          color: "black",
                          "&:hover": {
                            bgcolor: "rgba(255, 255, 255, 0.8)",
                          },
                        }}
                      >
                        <Icon icon="ph:arrow-down-bold" />
                      </Fab>
                    </Tooltip>
                  )}
                  <Container
                    sx={{
                      width: "100%",
                      height: "calc(100% - 74px)",
                      maxHeight: "calc(100% - 74px)",
                      display: "flex",
                      justifyContent: "flex-end",
                      flexDirection: "column",
                      padding: 2,
                    }}
                  >
                    {chats.map((chat) => {
                      const email = auth.user?.email;
                      return (
                        <div
                          key={chat.id}
                          style={{
                            display: "flex",
                            justifyContent:
                              chat.sender === email ? "flex-end" : "flex-start",
                            marginBottom: 8,
                          }}
                        >
                          <Box
                            sx={{
                              padding: "10px",
                              borderRadius:
                                chat.sender === email
                                  ? "15px 0px 15px 15px"
                                  : "0px 15px 15px 15px",
                              background:
                                chat.sender === email
                                  ? "rgba(255,255,255,0.6)"
                                  : "rgba(255,255,255,1)",
                              position: "relative",
                              backdropFilter: "blur(12px)",
                            }}
                          >
                            {chat.media && chat.type?.includes("image") ? (
                              <Image
                                src={chat.media}
                                style={{
                                  width: 150,
                                  height: 100,
                                  borderRadius: 8,
                                }}
                              />
                            ) : chat.media && chat.type?.includes("video") ? (
                              <video
                                src={chat.media}
                                style={{ width:150, height: 100 }}
                                controls
                              ></video>
                            ) : null}
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 600, color: "black" }}
                            >
                              {chat.message}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ fontWeight: 600, color: "black" }}
                            >
                              {moment(chat.timestamp).format("hh:mm A")}
                            </Typography>
                          </Box>
                        </div>
                      );
                    })}
                  </Container>
                </Box>
                <Paper
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    height: "74px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 0,
                    // background: "white",
                    borderTop: 1,
                    borderColor: "divider",
                  }}
                >
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
                          <video
                            src={media.url}
                            width="100%"
                            height={300}
                            controls
                          ></video>
                        )}
                      </>
                    )}
                    <Box p={2}>
                      <OutlinedInput
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleChatMessage(get(e, "target.value", ""));
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
                    onAbort={(e) => {
                      console.log(e);
                    }}
                  />
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        photoInputRef.current?.click();
                        handleClose();
                      }}
                    >
                      <ListItemIcon>
                        <Icon icon="material-symbols:image-outline" />
                      </ListItemIcon>
                      <ListItemText primary="Photos" />
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        videoInputRef.current?.click();
                        handleClose();
                      }}
                    >
                      <ListItemIcon>
                        <Icon icon="akar-icons:video" />
                      </ListItemIcon>
                      <ListItemText primary="Videos" />
                    </MenuItem>
                  </Menu>
                  <Container>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <IconButton onClick={handleClick}>
                        <Icon icon="ri:add-line" />
                      </IconButton>
                      <OutlinedInput
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleChatMessage(get(e, "target.value", ""));
                          }
                        }}
                        fullWidth
                        placeholder="Type a message"
                      />
                    </Stack>
                  </Container>
                </Paper>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Typography variant="h5" color="white">
                  Select a user to start chat
                </Typography>
              </div>
            )}
          </Box>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h5" color="white">
              Looks like you have no friends
            </Typography>
            <Icon icon="solar:sad-circle-outline" />
          </div>
        )}
      </Stack>
    </div>
  );
}
