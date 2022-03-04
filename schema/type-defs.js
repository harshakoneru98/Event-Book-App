const { gql } = require('apollo-server');

const typeDefs = gql`
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    type Query {
        events: [Event!]!
    }

    type Mutation {
        createEvent(eventInput: EventInput): Event
    }
`;

module.exports = { typeDefs };
