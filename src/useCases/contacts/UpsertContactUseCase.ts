import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/Contact";

interface IUpsertContactRequest {
  full_name: string;
  email: string;
  company_name: string;
}

class UpsertContactUseCase {
  async execute(payload: IUpsertContactRequest) {

    const contactRepo = AppDataSource.getRepository(Contact);

    const contact = contactRepo.create(payload);

    const result = await contactRepo.save(contact);

    return result;
  }
}

export default UpsertContactUseCase;
