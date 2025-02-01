import React from "react";
import { CircularProgress } from "@mui/material";

function PageLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center py-12">
      <CircularProgress />
    </div>
  );
}

export default PageLoading;
