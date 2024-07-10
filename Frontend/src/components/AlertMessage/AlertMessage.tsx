import React from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

type AlertProps = {
  isSuccess: boolean;
  message: string;
};

const AlertMessage = ({ isSuccess, message }: AlertProps) => {
  const alertIcon = isSuccess ? <CheckIcon /> : <CloseIcon />;
  const alertState = isSuccess ? "success" : "error";
  return (
    <Alert icon={alertIcon} severity={alertState}>
      {message}
    </Alert>
  );
};

export default AlertMessage;
