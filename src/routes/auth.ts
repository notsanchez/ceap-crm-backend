import { Router } from "express";
import LoginUseCase from "../useCases/auth/LoginUseCase";

const router = Router();

router.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  const _loginUseCase = new LoginUseCase();

  try {
    const result = await _loginUseCase.execute({ email, password });

    if (!result) {
      res.status(500).send({ error: "User not found" });
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: "Error creating user" });
  }
});

export default router;
