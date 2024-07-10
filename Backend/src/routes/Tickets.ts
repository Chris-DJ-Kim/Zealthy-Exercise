import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.get("/", async (req, res) => {
  const { data, error } = await req.db.from("support_tickets").select();
  if (!!error) res.send(error);
  res.send(data);
});

router.post("/create-ticket", async (req, res) => {
  const { email, name, description } = req.body;
  const id = uuidv4();
  const { error } = await req.db
    .from("support_tickets")
    .insert({ id, email, name, description, status: "new" });
  if (!!error) res.send(error);
  res.send("Ticket created");
});

router.post("/update-ticket", async (req, res) => {
  const { status, id } = req.body;
  const { error } = await req.db
    .from("support_tickets")
    .update({ status })
    .eq("id", id);
  if (!!error) res.send(error);
  res.send("Ticket updated");
});

export default router;
