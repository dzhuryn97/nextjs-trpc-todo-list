import {prisma} from '../../../prisma/prisma';
import {passwordHasher} from "@/server/lib/password-hasher";
import {User} from "../../../generated/prisma/client";
import {BusinessException} from "@/server/errors";
import {jwtService} from "@/server/lib/jwt-service";

export default class AuthService {
    async login(email: string, password: string) {
        console.log('hashed pass ', await passwordHasher.hash(password));
        const user: User | null = await this.findUserByEmail(email);
        if (!user || !await passwordHasher.verify(user.password, password)) {
            throw new BusinessException('Wrong credentials');
        }

        const token = await jwtService.sign(user);
        return token;
    }

    async register(name: string, email: string, password: string) {

        await this.ensureEmailInUnique(email);

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: await passwordHasher.hash(password),
            }
        });


        return await jwtService.sign(user);
    }

    private async ensureEmailInUnique(email: string) {
        const user = await this.findUserByEmail(email);

        if (user) {
            throw new BusinessException('User with this email already exist');
        }
    }

    private async findUserByEmail(email: string) {
        const user: User | null = await prisma.user.findFirst({
            where: {
                email: email
            }
        });
        return user;
    }
}
const authService = new AuthService();
export {authService}