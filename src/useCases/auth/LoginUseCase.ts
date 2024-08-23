import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";

interface ILoginRequest {
  email: string;
  password: string;
}

class LoginUseCase {
  async execute(payload: ILoginRequest) {
    const { email, password } = payload;

    const userRepo = AppDataSource.getRepository(User);

    const user = userRepo.findOne({
      where: {
        email: email,
        password: password,
      },
    });

    return user;
  }
}

export default LoginUseCase;
