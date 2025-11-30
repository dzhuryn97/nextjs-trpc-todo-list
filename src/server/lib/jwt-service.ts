import jwt from "jsonwebtoken";
import {User} from "../../../generated/prisma/client";

export type JWTUser = {
    id: string,
    name: string
}


class JwtService {

    public sign(user: User): string {
        return jwt.sign({user: {id: user.id, name: user.name}}, process.env.JWT_SECRET_PHRASE ?? '');
    }

    public verify(token: string): JWTUser {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_PHRASE ?? '') as { user: JWTUser };

        if (!decoded || !decoded.user) {
            throw new Error('Invalid JWT');
        }

        return decoded.user;
    }

    public decode(token: string): JWTUser {
        const decoded = jwt.decode(token) as { user: JWTUser };

        if (!decoded || !decoded.user) {
            throw new Error('Invalid JWT');
        }

        return decoded.user;
    }
}

export const jwtService = new JwtService();