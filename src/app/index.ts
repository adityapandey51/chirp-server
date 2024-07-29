import express from "express";
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4"


export async function initServer(){
    const app=express()

    const server = new ApolloServer({
        typeDefs:`
            type Query {
                sayHello: String
            }
        `,
        resolvers:{
            Query:{
                sayHello:()=>"Hello from GraphQL server"
            },
         },
      });

      await server.start();
      app.use(express.json());
      app.use("/graphql",expressMiddleware(server))

      return app;
}