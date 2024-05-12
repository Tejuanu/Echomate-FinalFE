export default () => {
  let userAccessToken = localStorage.getItem("accessToken") || "";
  const isSignedIn = Boolean(
    userAccessToken &&
      userAccessToken !== "undefined" &&
      userAccessToken !== "null"
  );
  return [isSignedIn];
};
