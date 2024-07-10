import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { data, error } = await req.db.from("support_tickets").select();
    if (!!error) {
      res.send({ success: false, message: error });
    } else {
      res.send({ success: true, data });
    }
  } catch (e) {
    next(e);
  }
});

router.post("/create-ticket", async (req, res, next) => {
  try {
    const { email, name, description } = req.body;
    if (!email || !name || !description) {
      return res.send({
        success: false,
        message: "All parameters are required",
      });
    }
    const id = uuidv4();
    const { error } = await req.db
      .from("support_tickets")
      .insert({ id, email, name, description, status: "new" });
    if (!!error) {
      res.send({ success: false, message: error });
    } else {
      res.send({ success: true });
    }
  } catch (e) {
    next(e);
  }
});

router.post("/update-ticket", async (req, res, next) => {
  try {
    const { status, id } = req.body;
    const { error } = await req.db
      .from("support_tickets")
      .update({ status })
      .eq("id", id);
    if (!!error) {
      res.send({ success: false, message: error });
    } else {
      res.send({ success: true });
    }
  } catch (e) {
    next(e);
  }
});

export default router;
