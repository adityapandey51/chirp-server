import express from "express";
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4"
import { User } from "./user";
import cors from "cors";
import { GraphqlContext } from "../interfaces";
import JWTService from "../services/jwt";


export async function initServer(){
    const app=express()

    const server = new ApolloServer<GraphqlContext>({
        typeDefs:`
            ${User.types}
            type Query {
                ${User.queries}
            }
        `,
        resolvers:{
            Query:{
               ...User.resolvers.queries,
            },
         },
      });

      await server.start();
      app.use(express.json());
      app.use(cors());
      app.use("/graphql",expressMiddleware(server,{
        context: async({req,res})=>{
            return {
                user: req.headers.authorization? JWTService.decodeToken(req.headers.authorization.split(" ")[1]): undefined
            }
        }
      }))

      return app;
}