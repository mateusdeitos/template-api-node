import User from "@modules/user/entities/typeorm/User";

export interface IUserRepository {
    save(user: User): Promise<User>;
    findByProp(prop: keyof User, value: unknown): Promise<User | undefined>;
}