import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Ticket } from "../../types";
import TicketDetails from "../TicketDetails/TicketDetails";

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
    <Box
      onClick={clickHandler}
      sx={{
        border: 1,
        borderColor: "grey.500",
        borderRadius: 2,
        padding: 2,
      }}
      width="50vw"
    >
      <Grid container spacing={1} sx={{ cursor: "pointer" }}>
        <Grid item xs={9}>
          <b>Ticket ID: </b>
          {id}
        </Grid>
        <Grid item xs={3}>
          {status}
        </Grid>
      </Grid>
      {isSelected && <TicketDetails ticketDetails={ticket} />}
    </Box>
  );
};

export default TicketItem;
