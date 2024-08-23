import { AppDataSource } from "../../data-source";
import { Message } from "../../entities/Message";

interface IGetMessageHistoryByContactIdRequest {
  contact_id: string;
}

class GetMessageHistoryByContactIdUseCase {
  async execute(payload: IGetMessageHistoryByContactIdRequest) {
    const { contact_id } = payload;

    const messagesRepo = AppDataSource.getRepository(Message);

    await messagesRepo.find({
      where: {
        contact_id: contact_id,
      },
    });

    return { success: true };
  }
}

export default GetMessageHistoryByContactIdUseCase;
