import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/Contact";

interface IGetContactsInfoByIdRequest {
  contact_id: string;
}

class GetContactUseCase {
  async execute(payload: IGetContactsInfoByIdRequest) {
    const { contact_id } = payload;

    const contactRepo = AppDataSource.getRepository(Contact);

    const contacts = contactRepo.findOne({
      where: {
        id: Number(contact_id),
      },
    });

    return contacts;
  }
}

export default GetContactUseCase;
