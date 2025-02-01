import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

function PageLoadingBackdrop(props) {
  const { open, handleClose } = props;
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.tooltip + 1 }}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default PageLoadingBackdrop;
