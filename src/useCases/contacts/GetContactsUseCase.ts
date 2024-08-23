import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/Contact";

class GetContactUseCase {
  async execute() {
    const contactRepo = AppDataSource.getRepository(Contact);

    const contacts = contactRepo.find();

    return contacts;
  }
}

export default GetContactUseCase;
