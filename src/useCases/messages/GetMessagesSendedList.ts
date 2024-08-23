import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/Contact";
import { Message } from "../../entities/Message";
import { User } from "../../entities/User";

class GetMessagesSendedListUseCase {
  async execute() {
    const messagesRepo = AppDataSource.getRepository(Message);

    const subQuery = messagesRepo
      .createQueryBuilder("m2")
      .select("MIN(m2.sended_at)", "min_sended_at")
      .where("m2.contact_id = m.contact_id")
      .andWhere("m2.sended = true");

    const messages = await messagesRepo
      .createQueryBuilder("m")
      .leftJoinAndSelect(Contact, "c", "m.contact_id = c.id")
      .leftJoinAndSelect(User, "u", "m.sended_by = u.id")
      .where("m.sended = true")
      .andWhere(`m.sended_at = (${subQuery.getQuery()})`)
      .select([
        "m.id AS message_id",
        "c.id AS contact_id",
        "c.full_name AS contact_name",
        "c.email AS contact_email",
        "m.message AS message_content",
        "m.sended AS message_sended",
        "m.approved AS message_approved",
        "m.sended_by AS sended_by_user_id",
        "u.full_name AS sended_by_user_name",
        "m.sended_at AS message_sended_at",
        "m.created_at AS message_created_at",
      ])
      .orderBy("m.sended_at", "DESC")
      .getRawMany();

    return messages;
  }
}

export default GetMessagesSendedListUseCase;
