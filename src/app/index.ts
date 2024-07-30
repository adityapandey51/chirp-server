import express from "express";
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4"
import { User } from "./user";

export async function initServer(){
    const app=express()

    const server = new ApolloServer({
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
      app.use("/graphql",expressMiddleware(server))

      return app;
}