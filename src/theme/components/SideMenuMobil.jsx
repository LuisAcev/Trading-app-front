import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuContent from "./MenuContent";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { usePutUsersMutation } from "../../api/userApi/userApi";
import { useNavigate } from "react-router-dom";
import { usersdelete } from "../../store/slices/usersSlice";

export default function SideMenuMobile({ open, toggleDrawer }) {
  const { t } = useTranslation();
  const { _id } = useSelector((ietm) => ietm.userSlice);
  const user = useSelector((item) => item.userSlice);
  const [putUsers] = usePutUsersMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCloseSeason = async () => {
    dispatch(usersdelete());
    await putUsers({ id: _id, body: { isLoading: false } });
    navigate(`/`, {
      replace: true,
    });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: "none",
          backgroundColor: "background.paper",
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: "70dvw",
          height: "100%",
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: "center", flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              alt="fullname"
              src={user.img}
              sx={{ width: 24, height: 24 }}
            />
            <Typography component="p" variant="h6">
              {user.fullname}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider />
        </Stack>
        <Stack sx={{ p: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<LogoutRoundedIcon />}
            onClick={handleCloseSeason}
          >
            {t("login.log_out")}
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
