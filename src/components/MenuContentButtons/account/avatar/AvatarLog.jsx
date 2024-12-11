import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

export const AvatarLog = () => {
  const { img } = useSelector((user) => user.userSlice);
  return (
    <Stack direction="row" spacing={2} sx={{ marginBottom: { xs: 1, lg: 3 } }}>
      <Avatar alt="Remy Sharp" src={img} sx={{ width: 150, height: 150 }} />
    </Stack>
  );
};
