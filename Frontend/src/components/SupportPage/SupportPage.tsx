import React, { useState } from "react";
import { AxiosResponse } from "axios";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Header from "../Header/Header";
import AlertMessage from "../AlertMessage/AlertMessage";
import api from "../../api/api";

type CreateTicketResponse = {
  success: boolean;
  message?: string;
};

const SupportPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessageText, setAlertMessageText] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const buttonText = isLoading ? "Submitting" : "Submit Ticket";

  const submitHandler = async () => {
    setIsLoading(true);
    const data = {
      name,
      email,
      description,
    };
    const response: AxiosResponse = await api.post<CreateTicketResponse>(
      "/tickets/create-ticket",
      data
    );
    const ticketResponse: CreateTicketResponse = response.data;
    if (ticketResponse.success) {
      setSubmitSuccess(true);
      setAlertMessageText("Ticket submitted successfully");
    } else {
      setSubmitSuccess(false);
      setAlertMessageText("Ticket submission failed");
    }
    setShowAlert(true);
    setIsLoading(false);
  };
  return (
    <div>
      <Header isAdmin={false} />
      <Stack>
        <h3>Submit ticket here</h3>
        <Stack gap={3}>
          <TextField
            type="text"
            label="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            fullWidth
            required
          ></TextField>
          <TextField
            type="text"
            label="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            fullWidth
            required
          ></TextField>
          <TextField
            type="text"
            label="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            fullWidth
            required
            multiline
            minRows={4}
          ></TextField>
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            disabled={isLoading}
            onClick={submitHandler}
          >
            {buttonText}
          </Button>
          {showAlert && (
            <AlertMessage
              isSuccess={submitSuccess}
              message={alertMessageText}
            />
          )}
        </Stack>
      </Stack>
    </div>
  );
};

export default SupportPage;
