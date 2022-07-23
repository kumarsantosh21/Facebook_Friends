import React from "react";
import Zoom from "@mui/material/Zoom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const ExpiredSession = ({
  dialogstate,
  handleClose,
  handleConfirmActionClick,
}) => {
  const buttonStyle = {
    textTransform: "none",
    borderRadius: "8px",
    color: "black",
    fontWeight: "bold",
  };
  return (
    <Dialog
      open={dialogstate}
      TransitionComponent={Zoom}
      keepMounted
      // onClose={handleClose}
      aria-describedby="alert-dialog-zoom-description"
    >
      <DialogTitle
        id="dialog-title"
        sx={{ background: "rgba(25, 118, 210, 0.04)" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>Facebook</div>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <span sx={{ marginTop: "20px" }}>
            You <b>Session expired</b> . Please click Reload to Login again.
          </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ ...buttonStyle }}
          variant="text"
          onClick={handleConfirmActionClick}
        >
          Reload
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ExpiredSession;
