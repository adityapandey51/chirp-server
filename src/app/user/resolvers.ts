import axios from "axios"
import { prisma } from "../../clients/db";
import JWTService from "../../services/jwt";
import { GraphqlContext } from "../../interfaces";

const queries={
    verifyGoogleToken:async(parent:any,{token}:{token:string})=>{
       const googleToken=token;
        const googleOAuthURL=new URL('https://oauth2.googleapis.com/tokeninfo');
        googleOAuthURL.searchParams.set('id_token',googleToken);
        const {data}=await axios.get(googleOAuthURL.toString(),{
            responseType:'json'
        })

        const checkForUser=await prisma.user.findUnique({
            where:{
                email:data.email
            }
        })

        if(!checkForUser){
            await prisma.user.create({
                data:{
                    email:data.email,
                    firstName: data.given_name,
                    lastName: data.family_name,
                    profileImageURL: data.picture
                }
            })
        }

        const userInDb=await prisma.user.findUnique({
            where:{
                email:data.email
            }
        })

        if(!userInDb) throw new Error("User with this email not found")

        const userToken=JWTService.generateTokenForUser(userInDb);
        return userToken
    },
    getCurrentUser:async(parent:any,args:any,ctx:GraphqlContext)=>{
        if(!ctx.user?.id) return null
        
        const user= await prisma.user.findUnique({
            where:{
                id:ctx.user?.id
            }
        })

        return user;
    }

}

export const resolvers={queries}