import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Page } from "components/index";
import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import FriendCard from "components/profile/FriendCard";
import { ThemeOptionTypes } from "theme/index";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import CustomTabPanel from "components/tabs/TabPanel";
import PostComponent from "components/post/PostComponent";
import { Image } from "antd";
import moment from "moment";
import { setSnack } from "src/redux/reducers/snack.reducer";
import { Input } from "react-componentry";
import { useForm, Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { orderBy } from "lodash";
import axios from "axios";
import { setUser } from "src/redux/reducers/auth.reducer";

interface CustomTabProps {
  value: number;
  index: number;
  children: React.ReactNode;
  title: string;
  customBtn?: React.ReactNode;
}

function CustomTab({
  value,
  index,
  children,
  title,
  customBtn,
}: CustomTabProps) {
  return (
    <CustomTabPanel value={value} index={index}>
      <Paper sx={{ p: 0, border: 1, borderColor: "divider" }} elevation={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ px: 2, pt: 1 }}
        >
          <Typography variant="h6">{title}</Typography>
          {customBtn && customBtn}
          {/* <OutlinedInput
            size="small"
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <Icon icon="ic:round-search" />
              </InputAdornment>
            }
          /> */}
        </Stack>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <div style={{ padding: 16 }}>
          <Grid container spacing={2}>
            {children}
          </Grid>
        </div>
      </Paper>
    </CustomTabPanel>
  );
}

export default function Profile() {
  const theme: ThemeOptionTypes = useTheme();
  const params = useParams();
  const profileInputRef = React.useRef<HTMLInputElement>(null);
  const coverInputRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { socket, user } = useAppSelector((state) => ({
    socket: state.socket.socket,
    user: state.auth.user,
  }));
  const [profileData, setProfileData] = React.useState<any>({});
  const [value, setTab] = React.useState(0);
  const [editProfile, setEditProfile] = React.useState(false);

  const { control, getValues, setValue } = useForm({
    defaultValues: {
      displayName: "",
      email: "",
      phoneNumber: "",
      dob: new Date(),
      address: "",
    },
  });

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    if (socket && user?._id) {
      const tempId = params.id || user?._id;
      socket.emit("get-profile-request", tempId);
      socket.on("create-post-response", (data) => {
        setProfileData((prev) => {
          return { ...prev, posts: data };
        });
      });
      socket.on("get-profile-response", (data: any) => {
        setProfileData(data);
      });
      socket.on("send-friend-request-error", (data: any) => {
        dispatch(setSnack({ open: true, message: data, type: "error" }));
      });
      socket.on("get-profile-error", (data: any) => {
        dispatch(setSnack({ open: true, message: data, type: "error" }));
      });
      socket.on("send-friend-request-response", (data: any) => {
        if (data.email === user?.email) {
          setProfileData(data);
        }
      });
    }
    if (params.id) setTab(0);
  }, [params.id, socket, user?._id, dispatch, user?.email]);

  async function saveProfile() {
    setEditProfile(false);
    const values = getValues();
    const obj = { ...values, _id: profileData._id };
    socket.emit("update-profile", obj);
    setProfileData(obj);
    // TODO: Save profile
  }

  async function handleFileUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) {
    try {
      if (e.target.files) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await axios.post(
          `${import.meta.env.VITE_server}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const obj = {
          ...profileData,
          [type]: data.fileUrl,
        };
        socket.emit("update-profile", obj);
        setProfileData(obj);
        dispatch(
          setUser({
            ...user,
            [type]: data.fileUrl,
          })
        );
      }
    } catch (error) {
      dispatch(setSnack({ open: true, message: error.message, type: "error" }));
    }
  }

  return (
    <Page title="Profile">
      <input
        ref={coverInputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => handleFileUpload(e, "cover")}
      />
      <input
        ref={profileInputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => handleFileUpload(e, "photoURL")}
      />
      <Box
        sx={{
          position: "relative",
          bgcolor: "background.paper",
          height: "500px",
          marginBottom: "24px",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Image
          alt="cover_photo"
          src={profileData.cover}
          style={{
            width: "100vw",
            height: 300,
            objectFit: "cover",
            objectPosition: "center",
          }}
          fallback="data:image/png;base64,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"
        />
        {user?._id === profileData._id && (
          <Button
            onClick={() => coverInputRef.current?.click()}
            startIcon={<Icon icon="tabler:edit" />}
            sx={{
              position: "absolute",
              right: 20,
              bottom: 220,
              color: "text.primary",
              bgcolor: "background.paper",
              "&:hover": { bgcolor: "background.paper" },
            }}
          >
            Edit cover Photo
          </Button>
        )}

        <Box
          sx={{
            width: 200,
            height: 200,
            borderRadius: 200,
            position: "absolute",
            bottom: 70,
            left: 30,
          }}
        >
          <div style={{ position: "relative" }}>
            <Image
              src={profileData?.photoURL}
              alt="profile_photo"
              style={{
                width: 200,
                height: 200,
                borderRadius: 200,
                objectFit: "cover",
                border: `8px solid ${theme.palette.background.paper}`,
              }}
              fallback="https://www.w3schools.com/w3images/team3.jpg"
            />
            {/* <img
              src={profileData?.photoURL || `https://www.w3schools.com/w3images/team3.jpg`}
              alt="profile_photo"
              style={{
                width: 200,
                height: 200,
                borderRadius: 200,
                objectFit: "cover",
                border: `8px solid ${theme.palette.background.paper}`,
              }}
            /> */}
            <IconButton
              onClick={() => profileInputRef.current?.click()}
              sx={{
                bgcolor: "background.paper",
                position: "absolute",
                bottom: 20,
                right: 20,
                "&:hover": { bgcolor: "white" },
                border: 1,
                borderColor: "divider",
              }}
            >
              <Icon icon="mdi:camera" />
            </IconButton>
          </div>
        </Box>
        <Box
          sx={{
            position: "relative",
            left: 250,
            pt: 2,
            width: "calc(100vw - 400px)",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Stack>
            <Typography variant="h3">{profileData.displayName}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {profileData.friends?.length} friends
            </Typography>
          </Stack>
          {user?._id !== profileData._id && (
            <>
              {profileData.friends?.find(
                (friend) => friend._id === user?._id
              ) ? (
                <Button
                  sx={{ ml: 3, fontSize: 18 }}
                  size="large"
                  variant="contained"
                  startIcon={<Icon icon="mdi:account-remove" />}
                >
                  Unfriend
                </Button>
              ) : (
                <>
                  {profileData.requests?.find(
                    (friend) => friend === user?._id
                  ) ? (
                    <Button
                      sx={{ ml: 3, fontSize: 18 }}
                      size="large"
                      variant="contained"
                      onClick={() => {
                        socket.emit("cancel-friend-request", {
                          sender: user?._id,
                          receiver: profileData._id,
                        });
                        setProfileData((prev) => {
                          return {
                            ...prev,
                            requests: prev.requests.filter(
                              (friend) => friend !== user?._id
                            ),
                          };
                        });
                      }}
                      startIcon={<Icon icon="mdi:account-remove" />}
                    >
                      Cancel request
                    </Button>
                  ) : (
                    <Button
                      sx={{ ml: 3, fontSize: 18 }}
                      size="large"
                      variant="contained"
                      onClick={() => {
                        socket.emit("send-friend-request", {
                          sender: user?._id,
                          receiver: profileData._id,
                        });
                        setProfileData((prev) => {
                          return {
                            ...prev,
                            requests: [...prev.requests, user?._id],
                          };
                        });
                      }}
                      startIcon={<Icon icon="mdi:account-plus" />}
                    >
                      Add friend
                    </Button>
                  )}
                </>
              )}
            </>
          )}
        </Box>
        <Tabs
          value={value}
          sx={{
            position: "absolute",
            bottom: 0,
            left: 30,
            right: 0,
            bgcolor: "background.paper",
            "& .MuiTab-root": {
              minWidth: 70,
              margin: 0,
            },

            "& .MuiTabs-scroller": {
              height: 35,
            },
          }}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Posts" />
          <Tab label="About" />
          <Tab label="Friends" />
          <Tab label="Photos" />
          <Tab label="Videos" />
          {profileData._id === user?._id && <Tab label="Friend Requests" />}
        </Tabs>
      </Box>
      <Container sx={{ pb: 3 }}>
        <CustomTab value={value} index={0} title="Posts">
          <Container sx={{ maxWidth: 520, width: 520 }}>
            {orderBy(profileData?.posts, "timestamp", "desc").map((post) => (
              <PostComponent key={post._id} {...post} />
            ))}
            {profileData?.posts?.length === 0 && (
              <Box textAlign="center" mt={4}>
                <h1>No posts found</h1>
              </Box>
            )}
          </Container>
        </CustomTab>
        <CustomTab
          value={value}
          index={1}
          title="About"
          customBtn={
            user?._id === profileData._id && (
              <>
                {editProfile ? (
                  <Button
                    onClick={saveProfile}
                    startIcon={<Icon icon="material-symbols:save-outline" />}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setEditProfile(true);
                      setValue("displayName", profileData.displayName);
                      setValue("email", profileData.email);
                      setValue("phoneNumber", `${profileData?.phoneNumber}`);
                      setValue("dob", profileData?.dob || new Date());
                      setValue("address", `${profileData?.address}`);
                    }}
                    startIcon={<Icon icon="mdi:edit" />}
                    variant="outlined"
                  >
                    Edit Profile
                  </Button>
                )}
              </>
            )
          }
        >
          {editProfile ? (
            <Box ml={2}>
              <Input
                label="Name"
                name="displayName"
                size="small"
                disabled
                sx={{ minWidth: 300 }}
                control={control}
                placeholder="Enter name"
              />
              <Input
                label="Email"
                name="email"
                size="small"
                disabled
                sx={{ minWidth: 300 }}
                control={control}
                placeholder="Enter email"
              />
              <Input
                label="Phone"
                name="phoneNumber"
                type="number"
                size="small"
                sx={{ minWidth: 300, mb: 0.5 }}
                control={control}
                placeholder="Enter phone"
              />
              <Controller
                control={control}
                name="dob"
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, mb: 0.5 }}
                    >
                      DOB
                    </Typography>
                    <DatePicker
                      value={moment(field.value)}
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                          sx: { minWidth: 300, mb: 2 },
                        },
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder="Enter DOB"
                        />)
                      } 
                    />
                  </LocalizationProvider>
                )}
              />
              <Input
                label="Address"
                name="address"
                size="small"
                sx={{ minWidth: 300 }}
                control={control}
                placeholder="Enter Address"
              />
            </Box>
          ) : (
            <div style={{ marginLeft: 16 }}>
              <Stack direction="row" alignItems="center">
                <Typography variant="subtitle1" sx={{ mr: 1 }}>
                  Name:{" "}
                </Typography>
                <Typography variant="subtitle2">
                  {profileData.displayName}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Typography variant="subtitle1" sx={{ mr: 1 }}>
                  Email:{" "}
                </Typography>
                <Typography variant="subtitle2">{profileData.email}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Typography variant="subtitle1" sx={{ mr: 1 }}>
                  Phone:{" "}
                </Typography>
                <Typography variant="subtitle2">
                  {profileData.phoneNumber || "NA"}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Typography variant="subtitle1" sx={{ mr: 1 }}>
                  DOB:{" "}
                </Typography>
                <Typography variant="subtitle2">
                  {profileData.dob
                    ? moment(profileData.dob).format("DD-MM-yy")
                    : "NA"}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Typography variant="subtitle1" sx={{ mr: 1 }}>
                  Address:{" "}
                </Typography>
                <Typography variant="subtitle2">
                  {profileData.address || "NA"}
                </Typography>
              </Stack>
            </div>
          )}
        </CustomTab>
        <CustomTab value={value} index={2} title="Friends">
          {profileData.friends?.map((friend, index) => (
            <Grid item xs={6} sm={6} md={4} key={index}>
              <FriendCard
                friendCard
                receiver={profileData._id}
                sender={friend._id}
                {...friend}
              />
            </Grid>
          ))}
        </CustomTab>
        <CustomTab value={value} index={3} title="Photos">
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Image
              style={{ width: "100%", height: 200, objectFit: "cover" }}
              src="https://source.unsplash.com/random/400x400"
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Image
              style={{ width: "100%", height: 200, objectFit: "cover" }}
              src="https://source.unsplash.com/random/400x400"
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Image
              style={{ width: "100%", height: 200, objectFit: "cover" }}
              src="https://source.unsplash.com/random/400x400"
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Image
              style={{ width: "100%", height: 200, objectFit: "cover" }}
              src="https://source.unsplash.com/random/400x400"
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Image
              style={{ width: "100%", height: 200, objectFit: "cover" }}
              src="https://source.unsplash.com/random/400x400"
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Image
              style={{ width: "100%", height: 200, objectFit: "cover" }}
              src="https://source.unsplash.com/random/400x400"
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Image
              style={{ width: "100%", height: 200, objectFit: "cover" }}
              src="https://source.unsplash.com/random/400x400"
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Image
              style={{ width: "100%", height: 200, objectFit: "cover" }}
              src="https://source.unsplash.com/random/400x400"
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Image
              style={{ width: "100%", height: 200, objectFit: "cover" }}
              src="https://source.unsplash.com/random/400x400"
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Image
              style={{ width: "100%", height: 200, objectFit: "cover" }}
              src="https://source.unsplash.com/random/400x400"
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Image
              style={{ width: "100%", height: 200, objectFit: "cover" }}
              src="https://source.unsplash.com/random/400x400"
            />
          </Grid>
        </CustomTab>
        <CustomTab value={value} index={4} title="Videos">
          {profileData.videos?.map((friend, index) => (
            <Grid item xs={6} sm={6} md={4} key={index}>
              <FriendCard {...friend} />
            </Grid>
          ))}
        </CustomTab>
        <CustomTab value={value} index={5} title="Friend Requests">
          {profileData.requests?.map((request, index) => (
            <Grid item xs={6} sm={6} md={4} key={index}>
              <FriendCard
                {...request}
                receiver={profileData._id}
                sender={request._id}
              />
            </Grid>
          ))}
        </CustomTab>
      </Container>
    </Page>
  );
}
