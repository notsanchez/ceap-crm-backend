import { Router } from "express";
import GetContactInfoByIdUseCase from "../useCases/contacts/GetContactsInfoByIdUseCase";
import GetContactsUseCase from "../useCases/contacts/GetContactsUseCase";
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

    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ error: "Error creating contact" });
  }
});

router.get("/contacts", async (req, res) => {
  const getContactsUseCase = new GetContactsUseCase();

  try {
    const result = await getContactsUseCase.execute();

    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error: "Contacts not found" });
  }
});

router.get("/contacts/:id", async (req, res) => {
  const { id } = req.params;

  const getContactsUseCase = new GetContactInfoByIdUseCase();

  try {
    const result = await getContactsUseCase.execute({ contact_id: id });

    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error: "Contact not found" });
  }
});

export default router;
