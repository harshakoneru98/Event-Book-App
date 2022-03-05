require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { typeDefs } = require('./graphql/schema/index');
const { resolvers } = require('./graphql/resolvers/index');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        let isAuth;
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            isAuth = false;
            return { isAuth };
        }
        const token = authHeader.split(' ')[1];
        if (!token || token === '') {
            isAuth = false;
            return { isAuth };
        }
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, 'somesupersecretkey');
        } catch (err) {
            isAuth = false;
            return { isAuth };
        }
        if (!decodedToken) {
            isAuth = false;
            return { isAuth };
        }
        isAuth = true;
        let userId = decodedToken.userId;
        return { isAuth, userId };
    }
});

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
