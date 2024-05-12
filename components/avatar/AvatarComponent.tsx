import { SxProps } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useAppSelector } from "src/redux/hooks";

export default function AvatarComponent({
  name,
  sx,
}: {
  name?: string;
  sx?: SxProps;
}) {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <Avatar
      sx={{ width: 35, height: 35, ...sx }}
      alt={name}
      src={`${
        user.photoURL ||
        `https://www.gravatar.com/avatar/${user.email}?d=identicon`
      }`}
      // src="https://www.w3schools.com/w3images/team2.jpg"
    />
  );
}
