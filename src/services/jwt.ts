import JWT from "jsonwebtoken";
import { User } from "@prisma/client";
import { JWTUser } from "../interfaces";

const JWTSECRET="helloworld"
class JWTService {
    public static async generateTokenForUser(user: User){

        const payload: JWTUser={
            id:user?.id,
            email:user?.email
        }

        const token = JWT.sign(payload,JWTSECRET)
        return token;
    }

    public static decodeToken(token: string){
        return JWT.verify(token,JWTSECRET) as JWTUser;
    }
}

export default JWTService