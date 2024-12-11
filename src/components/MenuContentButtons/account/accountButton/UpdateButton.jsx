import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import { usePutUsersMutation } from "../../../../api/userApi/userApi";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { usersUpdate } from "../../../../store/slices/usersSlice";

export const UpdateButon = ({ setEditText, body, error }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const payload = useSelector((ietm) => ietm.userSlice);
  const [putUsers] = usePutUsersMutation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleSubmitUpdate = async () => {
    try {
      setEditText(true);
      enqueueSnackbar(t("alert.userUpdate"), { variant: "success", autoHideDuration: 1000,});
      dispatch(usersUpdate(body));
      await putUsers({ id: payload._id, body: body });
      handleClose();
    } catch (err) {
      enqueueSnackbar(`Error: ${err}`, { variant: "error",autoHideDuration: 1000, });
    }
  };

  const handleClickOpen = () => {
    if ( Object.keys(error).length === 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        color=""
        variant="contained"
        type="submit"
        onClick={handleClickOpen}
        sx={{
          backgroundColor: "rgba(242,147, 8, 0.6)",
          "&:hover": {
            backgroundColor: "rgba(242,147, 8, 0.9)", // Color al hacer hover
          },
          fontSize: 19,
          fontWeight: "bold",
          width: { xs: "100%", sm: "fit-content", lg: "15%" },
        }}
      >
        {t("account.update.button")}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("account.update.buttonText")}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              setEditText(true);
            }}
          >
            {t("account.update.disagree")}
          </Button>
          <Button onClick={handleSubmitUpdate} autoFocus>
            {t("account.update.agree")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
