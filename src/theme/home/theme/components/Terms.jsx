import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";

export const Terms = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
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
          fontSize: 12,
          fontWeight: "bold",
          color:"#beb9b3",
          padding: '0 0 0 0.3rem'
        }}
      >
        {t("home.terms.terms")}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("home.terms.legend")}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            {t("account.update.disagree")}
          </Button>
          <Button onClick={handleClose} autoFocus>
            {t("account.update.agree")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
