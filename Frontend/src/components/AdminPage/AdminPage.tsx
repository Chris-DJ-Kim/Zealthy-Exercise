import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Header from "../Header/Header";
import api from "../../api/api";
import { AxiosResponse } from "axios";
import { Ticket } from "../../types";
import TicketList from "../TicketList/TicketList";
import AlertMessage from "../AlertMessage/AlertMessage";

type GetAllTicketsResponse = {
  success: boolean;
  data?: Ticket[];
};

const AdminPage = () => {
  const [allTickets, setAllTickets] = useState<Ticket[]>([]);
  const [getTicketsError, setGetTicketsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const getTickets = async () => {
    setIsLoading(true);

    try {
      const response: AxiosResponse = await api.get("/tickets/");
      const ticketResponse: GetAllTicketsResponse = response.data;
      if (ticketResponse.success) {
        const tickets = ticketResponse.data || [];
        setAllTickets(tickets);
        setGetTicketsError("");
      } else {
        setGetTicketsError("Could not fetch tickets");
      }
    } catch (e) {
      setGetTicketsError("Something went wrong while fetching tickets");
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getTickets();
  }, []);
  const ticketListText = isLoading ? "Loading tickets" : "No tickets yet";
  const hasTickets = allTickets.length > 0;
  return (
    <Stack alignItems="center">
      <Header isAdmin={true} />
      <Box marginBottom={4}>
        {hasTickets ? <TicketList tickets={allTickets} /> : ticketListText}
      </Box>
      {getTicketsError && (
        <AlertMessage isSuccess={false} message={getTicketsError} />
      )}
    </Stack>
  );
};

export default AdminPage;
