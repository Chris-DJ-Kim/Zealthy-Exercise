import React, { useState } from "react";
import { AxiosResponse } from "axios";
import validator from "validator";
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
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const buttonText = isLoading ? "Submitting" : "Submit Ticket";

  const submitHandler = async () => {
    setIsLoading(true);
    const data = {
      name,
      email,
      description,
    };
    const isEmailValid = !!email && validator.isEmail(email);
    const hasErrors = !name || !description || !isEmailValid;
    if (hasErrors) {
      setNameError(!name);
      setEmailError(!isEmailValid);
      setDescriptionError(!description);
      setShowAlert(true);
      setSubmitSuccess(false);
      setAlertMessageText("Invalid fields");
      setIsLoading(false);
      return;
    }
    try {
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
    } catch (e) {
      setSubmitSuccess(false);
      setAlertMessageText("Unexpected failure");
    } finally {
      setNameError(false);
      setEmailError(false);
      setDescriptionError(false);
      setShowAlert(true);
      setIsLoading(false);
    }
  };
  return (
    <Stack alignItems="center">
      <Header isAdmin={false} />
      <Stack width="15vw">
        <h3>Submit ticket here</h3>
        <Stack gap={3}>
          <TextField
            type="text"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            fullWidth
            required
            error={nameError}
          />
          <TextField
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            fullWidth
            required
            error={emailError}
          />
          <TextField
            type="text"
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            fullWidth
            required
            multiline
            minRows={4}
            error={descriptionError}
          />
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
    </Stack>
  );
};

export default SupportPage;
