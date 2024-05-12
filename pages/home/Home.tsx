import {
  Box,
  Container,
} from "@mui/material";
import { PageContainer } from "components/index";
import CreatePostComponent from "components/post/CreatePostComponent";
import PostComponent from "components/post/PostComponent";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import React from "react";
import { setSnack } from "src/redux/reducers/snack.reducer";
import orderBy from "lodash/orderBy";
import { PostTypes } from "utils/types/post.types";

export default function Home() {
  const dispatch = useAppDispatch();
  const [posts, setPosts] = React.useState<PostTypes[]>([]);
  const { socket } = useAppSelector((state) => ({
    socket: state.socket.socket,
  }));

  React.useEffect(() => {
    if (socket) {
      socket.emit("get-posts-request");
      socket.on("create-post-response", (data) => {
        setPosts(data);
      });
      socket.on("get-posts-response", (data) => {
        setPosts(data);
      });
      socket.on("get-posts-error", (data) => {
        dispatch(setSnack({ open: true, message: data, type: "error" }));
      });
    }
  }, [socket, dispatch]);

  return (
    <PageContainer title="Home" sx={{ p: 0 }}>
      <Container
        sx={{
          maxWidth: 520,
          minWidth: 520,
          minHeight: "calc(100vh - 80px)",
          maxHeight: "calc(100vh - 80px)",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <CreatePostComponent />
        {orderBy(posts, "timestamp", "desc").map((post) => (
          <PostComponent key={post._id} {...post} />
        ))}
        {posts.length === 0 && (
          <Box textAlign="center" mt={4}>
            <h1>No posts found</h1>
          </Box>
        )}
      </Container>
    </PageContainer>
  );
}
