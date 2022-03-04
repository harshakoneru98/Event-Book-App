require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./graphql/schema/index');
const { resolvers } = require('./graphql/resolvers/index');
const mongoose = require('mongoose');

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@eventscluster.5kxeb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
    )
    .then(() => {
        server.listen().then(({ url }) => {
            console.log(`APIs are working at ${url}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
