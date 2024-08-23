import { AppDataSource } from "../../data-source";
import { Message } from "../../entities/Message";

class GetMessagesInQueueToApproveUseCase {
  async execute() {
    const messagesRepo = AppDataSource.getRepository(Message);

    const message = messagesRepo.find({
      where: {
        approved: false,
      },
    });

    return message;
  }
}

export default GetMessagesInQueueToApproveUseCase;
