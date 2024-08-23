import { AppDataSource } from "../../data-source";
import { Message } from "../../entities/Message";

interface IApproveMessageToSendRequest {
  message_id: string;
}

class ApproveMessageToSendUseCase {
  async execute(payload: IApproveMessageToSendRequest) {
    const { message_id } = payload;

    const messagesRepo = AppDataSource.getRepository(Message);

    await messagesRepo.update({ id: Number(message_id) }, { approved: true });

    return { success: true };
  }
}

export default ApproveMessageToSendUseCase;
