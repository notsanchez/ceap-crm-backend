import { Router } from "express";
import ApproveMessageToSendUseCase from "../useCases/messages/ApproveMessageToSendUseCase";
import GetMessageHistoryByContactIdUseCase from "../useCases/messages/GetMessageHistoryByContactIdUseCase";
import GetMessagesInQueueToApproveUseCase from "../useCases/messages/GetMessagesInQueueToApproveUseCase";
import GetMessagesSendedListUseCase from "../useCases/messages/GetMessagesSendedList";

const router = Router();

router.get("/messages", async (req, res) => {
  const _getMessagesSendedListUseCase = new GetMessagesSendedListUseCase();

  try {
    const result = await _getMessagesSendedListUseCase.execute();

    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error: "Contacts not found" });
  }
});

router.get("/messages/queue", async (req, res) => {
  const _getMessagesInQueueToApproveUseCase =
    new GetMessagesInQueueToApproveUseCase();

  try {
    const result = await _getMessagesInQueueToApproveUseCase.execute();

    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ error: "Error" });
  }
});

router.post("/messages/approve/:id", async (req, res) => {
  const { id } = req.params;

  const _approveMessageToSendUseCase = new ApproveMessageToSendUseCase();

  try {
    const result = await _approveMessageToSendUseCase.execute({
      message_id: id,
    });

    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error: "Contacts not found" });
  }
});

router.get("/messages/history/:id", async (req, res) => {
  const { id } = req.params;

  const _getMessageHistoryByContactIdUseCase =
    new GetMessageHistoryByContactIdUseCase();

  try {
    const result = await _getMessageHistoryByContactIdUseCase.execute({
      contact_id: id,
    });

    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error: "Contacts not found" });
  }
});

export default router;
