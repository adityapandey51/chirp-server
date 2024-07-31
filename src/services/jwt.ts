import { empty } from "@prisma/client/runtime/library";
import { prisma } from "../clients/db";
import JWT from "jsonwebtoken";
import { User } from "@prisma/client";

const JWTSECRET="helloworld"
class JWTService {
    public static async generateTokenForUser(user: User){

        const payload={
            id:user?.id,
            email:user?.email
        }

        const token = JWT.sign(payload,JWTSECRET)
        return token;
    }
}

export default JWTService