import React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import { Ticket } from "../../types";

type TicketItemProps = {
  ticket: Ticket;
  selectedTicketId: string;
  setSelectedId: (id: string) => void;
};

const TicketItem = ({
  ticket,
  selectedTicketId,
  setSelectedId,
}: TicketItemProps) => {
  const { id, status } = ticket;
  const isSelected = selectedTicketId === id;
  const clickHandler = () => setSelectedId(id);
  return (
    <div onClick={clickHandler}>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <b>Ticket ID: </b>
          {id}
        </Grid>
        <Grid item xs={3}>
          {status}
        </Grid>
      </Grid>
    </div>
  );
};

export default TicketItem;
