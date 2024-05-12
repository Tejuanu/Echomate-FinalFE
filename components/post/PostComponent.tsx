import {
  Badge,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogContent,
  IconButton,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
// import postImg from "assets/images/post_image.jpg";
import { Icon } from "@iconify/react";
import AvatarComponent from "components/avatar/AvatarComponent";
import { get } from "lodash";
import moment from "moment";
import { PostTypes } from "utils/types/post.types";
import { Image } from "antd";
import { useAppSelector } from "src/redux/hooks";
import { useState } from "react";

export default function PostComponent(props: PostTypes) {
  const { user, socket } = useAppSelector((state) => ({
    user: state.auth.user,
    socket: state.socket.socket,
  }));
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  return (
    <Paper elevation={2} sx={{ borderRadius: 1, mb: 2 }}>
      <Dialog
        open={showCommentDialog}
        onClose={() => setShowCommentDialog(false)}
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
          <Typography variant="h6">Comment on this post</Typography>
          <IconButton
            onClick={() => {
              setShowCommentDialog(false);
              setComment("");
            }}
          >
            <Icon icon="ic:sharp-close" />
          </IconButton>
        </Stack>
        <DialogContent>
          <OutlinedInput
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            sx={{ mt: 2 }}
            onClick={() => {
              socket.emit("comment-post", {
                post_id: props._id,
                user_id: user._id,
                text: comment,
              });
              setComment("");
              setShowCommentDialog(false);
            }}
          >
            Comment
          </Button>
        </DialogContent>
      </Dialog>
      <Stack
        direction="row"
        alignItems="center"
        sx={{ px: 2, py: 1, borderBottom: 1, borderColor: "divider" }}
      >
        <AvatarComponent sx={{ mr: 1 }} />
        <Stack sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1">
            <strong>{get(props, "owner.displayName")}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {moment(get(props, "timestamp")).fromNow()}
          </Typography>
        </Stack>
        {/* <IconButton>
          <Icon icon="ri:more-line" />
        </IconButton> */}
        {user._id === get(props, "owner._id") && (
          <IconButton
            onClick={() => {
              socket.emit("delete-post", props._id);
            }}
          >
            <Icon icon="carbon:close" />
          </IconButton>
        )}
      </Stack>
      {props.type === "text" ? (
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            py: 3,
          }}
        >
          <Typography variant="h3">{props.content}</Typography>
        </Box>
      ) : props.type === "image" ? (
        <Image
          src={props.content}
          alt="post"
          style={{
            width: 620,
            maxHeight: 400,
            objectFit: "contain",
          }}
        />
      ) : (
        <video
          src={props.content}
          controls
          style={{
            width: "100%",
            height: 250,
          }}
        />
      )}
      {props.type !== "text" && (
        <Typography sx={{ px: 2, py: 1 }} variant="subtitle1">
          {props.text}
        </Typography>
      )}
      <Stack
        direction="row"
        spacing={2}
        sx={{ p: 1, borderTop: 1, borderColor: "divider" }}
      >
        <Button
          sx={{ bgcolor: "transparent" }}
          startIcon={
            props.likes.includes(user._id) ? (
              <Badge
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                badgeContent={props.likes?.length}
                color="primary"
              >
                <Icon
                  icon="mdi:like"
                  style={{ fontSize: 20, color: " #17A9FD" }}
                />
              </Badge>
            ) : (
              <Icon icon="ei:like" style={{ fontSize: 26 }} />
            )
          }
          fullWidth
          onClick={() => {
            if (props.likes?.includes(user._id)) {
              socket.emit("unlike-post", {
                post_id: props._id,
                user_id: user._id,
              });
            } else {
              socket.emit("like-post", {
                post_id: props._id,
                user_id: user._id,
              });
            }
          }}
        >
          {props.likes?.includes(user._id) ? "Unlike" : "Like"}
        </Button>
        <Button
          sx={{ bgcolor: "transparent" }}
          startIcon={
            <Badge
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              badgeContent={props.comments?.length}
              color="primary"
            >
              <Icon icon="teenyicons:chat-outline" style={{ fontSize: 16 }} />
            </Badge>
          }
          onClick={() => setShowCommentDialog(true)}
          fullWidth
        >
          Comment
        </Button>
        <Button
          sx={{ bgcolor: "transparent" }}
          startIcon={<Icon icon="ri:share-forward-line" />}
          fullWidth
        >
          Share
        </Button>
      </Stack>
      <>
        {props.comments?.length > 0 && (
          <>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                p: 1,
                borderBottom: 1,
                borderTop: 1,
                borderColor: "divider",
              }}
            >
              <Typography variant="h6">Comments</Typography>
              <IconButton onClick={() => setShowComments((prev) => !prev)}>
                <Icon
                  icon={
                    showComments ? "mingcute:up-fill" : "mingcute:down-fill"
                  }
                />
              </IconButton>
            </Stack>
            <Collapse in={showComments}>
              {props.comments?.map((comment) => (
                <Stack
                  key={comment._id}
                  direction="row"
                  alignItems="center"
                  sx={{ p: 1, borderBottom: 1, borderColor: "divider" }}
                >
                  <AvatarComponent sx={{ mr: 1 }} />
                  <Stack>
                    <Stack direction="row" alignItems="center">
                      <Typography variant="subtitle1">
                        <strong>{get(comment, "user.displayName")}</strong>
                      </Typography>
                      <Typography
                        sx={{ ml: 1 }}
                        variant="body2"
                        color="text.secondary"
                      >
                        {moment(get(comment, "timestamp")).fromNow()}
                      </Typography>
                    </Stack>
                    <Typography variant="body1">{comment.text}</Typography>
                  </Stack>
                </Stack>
              ))}
            </Collapse>
          </>
        )}
      </>
    </Paper>
  );
}
