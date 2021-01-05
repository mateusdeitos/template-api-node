import User from "../entities/typeorm/User";
import { IUserRepository } from "../repositories/dto/IUserRepository";

export default class CreateUserService {

    constructor(
        private userRepository: IUserRepository,
    ) {}

    private async validadeUser(user: User): Promise<void> {
        const existeUserComMesmoEmail = await this.userRepository.findByProp('email', user.email);

    }

    public async executa(user: User): Promise<User> {
        this.validadeUser(user);

        return this.userRepository.save(user);
    }
}