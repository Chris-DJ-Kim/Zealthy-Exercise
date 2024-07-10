import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AlertMessage from "../AlertMessage/AlertMessage";
import { Ticket } from "../../types";
import DetailItem from "../DetailItem/DetailItem";
import TicketStatus from "../TicketStatus/TicketStatus";

type TicketDetailsProps = {
  ticketDetails: Ticket;
};

const TicketDetails = ({ ticketDetails }: TicketDetailsProps) => {
  const { id, name, email, description, status } = ticketDetails;
  const [ticketResponse, setTicketResponse] = useState("");
  const [reponseSent, setResponseSent] = useState(false);
  const [responseSentSuccess, setResponseSuccess] = useState(false);
  const [responseSentText, setResponseSentText] = useState("");

  const submitHandler = () => {
    setResponseSent(true);
    if (!ticketResponse) {
      setResponseSuccess(false);
      setResponseSentText("Please write a response before submitting");
    } else {
      setResponseSuccess(true);
      setResponseSentText("Email response sent! Check console for details.");
      console.log("Message was sent with body:", ticketResponse);
    }
  };
  return (
    <Stack spacing={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <b>Ticket Details</b>
        </Grid>
        <DetailItem label="Ticket Id" value={id} />
        <DetailItem label="User Name" value={name} />
        <DetailItem label="User Email" value={email} />
        <DetailItem label="Description" value={description} />
      </Grid>
      <TicketStatus id={id} status={status} />
      <TextField
        type="text"
        label="Response"
        onChange={(e) => setTicketResponse(e.target.value)}
        value={ticketResponse}
        fullWidth
      />
      <Button
        variant="outlined"
        color="primary"
        type="submit"
        onClick={submitHandler}
      >
        Send Response
      </Button>
      {reponseSent && (
        <AlertMessage
          isSuccess={responseSentSuccess}
          message={responseSentText}
        />
      )}
    </Stack>
  );
};

export default TicketDetails;
