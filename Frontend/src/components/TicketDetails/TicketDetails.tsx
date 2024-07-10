import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AlertMessage from "../AlertMessage/AlertMessage";
import { Ticket } from "../../types";

type TicketDetailsProps = {
  ticketDetails: Ticket;
};

const TicketDetails = ({ ticketDetails }: TicketDetailsProps) => {
  const { id, name, email, description, status } = ticketDetails;
  const [ticketResponse, setTicketResponse] = useState("");
  const [reponseSent, setResponseSent] = useState(false);
  const responseSentText = "Email response sent! Check console for details.";

  const submitHandler = () => {
    setResponseSent(true);
  };
  return (
    <Stack>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <b>Ticket Details</b>
        </Grid>
        <Grid item xs={3}>
          Ticket Id:
        </Grid>
        <Grid item xs={9}>
          {id}
        </Grid>
      </Grid>
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
        <AlertMessage isSuccess={true} message={responseSentText} />
      )}
    </Stack>
  );
};

export default TicketDetails;
