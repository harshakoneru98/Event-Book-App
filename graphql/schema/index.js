const { gql } = require('apollo-server');

const typeDefs = gql`
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    type User {
        _id: ID!
        email: String!
        password: String
        createdEvents: [Event!]
    }

    input UserInput {
        email: String!
        password: String!
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    type Booking {
        _id: ID!
        event: Event!
        user: User!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        events: [Event!]!
        bookings: [Booking!]!
        login(email: String!, password: String!): AuthData!
    }

    type Mutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
        bookEvent(eventId: ID!): Booking!
        cancelBooking(bookingId: ID!): Event!
    }
`;

module.exports = { typeDefs };
