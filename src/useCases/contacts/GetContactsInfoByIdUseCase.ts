import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/Contact";

interface IGetContactsInfoByIdRequest {
  contact_id: string;
}

class GetContactInfoByIdUseCase {
  async execute(payload: IGetContactsInfoByIdRequest) {
    const { contact_id } = payload;

    const contactRepo = AppDataSource.getRepository(Contact);

    const contacts = contactRepo.findOne({
      where: {
        id: contact_id,
      },
    });

    return contacts;
  }
}

export default GetContactInfoByIdUseCase;
