import React, { useState } from "react";
import Stack from "@mui/material/Stack";

import { Ticket } from "../../types";
import TicketItem from "../TicketItem/TicketItem";

type TicketListProps = {
  tickets: Ticket[];
};

const TicketList = ({ tickets }: TicketListProps) => {
  const [selectedTicketId, setSelectedTicketId] = useState("");
  const setSelectedId = (id: string) => setSelectedTicketId(id);
  const listTickets = () =>
    tickets.map((ticket) => (
      <TicketItem
        key={ticket.id}
        ticket={ticket}
        selectedTicketId={selectedTicketId}
        setSelectedId={setSelectedId}
      />
    ));

  return (
    <>
      <h4>Ticket List</h4>
      <Stack>{listTickets()}</Stack>
    </>
  );
};

export default TicketList;
