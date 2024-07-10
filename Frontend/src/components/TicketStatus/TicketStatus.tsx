import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import api from "../../api/api";
import { AxiosResponse } from "axios";
import AlertMessage from "../AlertMessage/AlertMessage";

type TicketStatusProps = {
  id: string;
  status: string;
};

type UpdateTicketResponse = {
  success: boolean;
  message?: string;
};

const TicketStatus = ({ id, status }: TicketStatusProps) => {
  const [ticketStatus, setTicketStatus] = useState(status);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [alertMessageText, setAlertMessageText] = useState("");

  const submitHandler = async () => {
    setIsLoading(true);
    try {
      const updateData = { id, status: ticketStatus };
      const response: AxiosResponse = await api.post(
        "/tickets/update-ticket",
        updateData
      );
      const updateTicketResponse: UpdateTicketResponse = response.data;
      if (updateTicketResponse.success) {
        setAlertMessageText("Status update success");
        setUpdateSuccess(true);
      } else {
        setAlertMessageText("Unable to update status");
        setUpdateSuccess(false);
      }
    } catch (e) {
      setAlertMessageText("Something went wrong");
      setUpdateSuccess(false);
    }
    setShowAlert(true);
    setIsLoading(false);
  };

  return (
    <FormControl>
      <FormLabel id="ticket-status">Ticket Status</FormLabel>
      <RadioGroup
        row
        sx={{ justifyContent: "center" }}
        aria-labelledby="ticket status"
        value={ticketStatus}
        onChange={(event) => setTicketStatus(event.target.value)}
      >
        <FormControlLabel value="new" control={<Radio />} label="new" />
        <FormControlLabel
          value="in-progress"
          control={<Radio />}
          label="in-progress"
        />
        <FormControlLabel
          value="resolved"
          control={<Radio />}
          label="resolved"
        />
      </RadioGroup>
      <Button
        variant="outlined"
        color="secondary"
        type="submit"
        disabled={isLoading}
        onClick={submitHandler}
      >
        Update Status
      </Button>
      {showAlert && (
        <AlertMessage isSuccess={updateSuccess} message={alertMessageText} />
      )}
    </FormControl>
  );
};

export default TicketStatus;
