import { Router } from "express";
import GetContactUseCase from "../useCases/contacts/GetContactsUseCase";
import UpsertContactUseCase from "../useCases/contacts/UpsertContactUseCase";

const router = Router();

router.post("/contacts", async (req, res) => {
  const { full_name, email, company_name } = req.body;

  const upserContactUseCase = new UpsertContactUseCase();

  try {
    const result = await upserContactUseCase.execute({
      full_name,
      email,
      company_name,
    });

    if (!result) {
      res.status(500).send({ error: "User not found" });
    }

    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ error: "Error creating user" });
  }
});

router.get("/contacts", async (req, res) => {
  const getContactUseCase = new GetContactUseCase();

  try {
    const result = await getContactUseCase.execute();

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: "Error creating user" });
  }
});

export default router;
