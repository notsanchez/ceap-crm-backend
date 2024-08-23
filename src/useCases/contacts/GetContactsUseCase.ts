import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/Contact";

class GetContactsUseCase {
  async execute() {
    const contactRepo = AppDataSource.getRepository(Contact);

    const contacts = contactRepo.find();

    return contacts;
  }
}

export default GetContactsUseCase;
