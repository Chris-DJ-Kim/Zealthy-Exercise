import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Header from "../Header/Header";
import api from "../../api/api";

const SupportPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const buttonText = isLoading ? "Submitting" : "Submit Ticket";

  const submitHandler = () => {
    setIsLoading(true);
    const data = {
      name,
      email,
      description,
    };
    const { success } = api.post("/tickets/create-ticket", data);
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
        </Stack>
      </Stack>
    </div>
  );
};

export default SupportPage;
