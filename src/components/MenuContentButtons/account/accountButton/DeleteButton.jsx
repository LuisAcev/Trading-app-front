import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import { useDeleteUsersMutation } from "../../../../api/userApi/userApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { usersdelete } from "../../../../store/slices/usersSlice";
import { useSnackbar } from "notistack";

export const DeleteButton = ({ setEditText }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const payload = useSelector((ietm) => ietm.userSlice);
  const [deleteUsers] = useDeleteUsersMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    try {
      handleClose();
      setEditText(true);
      deleteUsers(payload._id);
      dispatch(usersdelete());
      enqueueSnackbar(t("alert.userDelete"), {
        variant: "success",
        autoHideDuration: 1000,
      });
      navigate(`/`, {
        replace: true,
      });
    } catch (error) {
      enqueueSnackbar(`Error: ${error}`, {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        color=""
        sx={{
          backgroundColor: "rgba(225, 22, 65, 0.6)",
          "&:hover": {
            backgroundColor: "rgba(225, 22, 65, 0.9)", // Color al hacer hover
          },
          fontSize: 19,
          fontWeight: "bold",
          width: { xs: "100%", sm: "fit-content", lg: "15%" },
        }}
      >
        {t("account.delete.button")}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("account.delete.buttonText")}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              setEditText(true);
            }}
          >
            {t("account.delete.disagree")}
          </Button>
          <Button type="submit" onClick={handleSubmit} autoFocus>
            {t("account.delete.agree")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
