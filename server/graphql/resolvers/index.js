const authQuery = require('./auth/authQuery');
const eventsQuery = require('./events/eventsQuery');
const bookingsQuery = require('./bookings/bookingsQuery');
const authMutation = require('./auth/authMutation');
const eventsMutation = require('./events/eventsMutation');
const bookingsMutation = require('./bookings/bookingsMutation');

const resolvers = {
    Query: {
        ...authQuery,
        ...eventsQuery,
        ...bookingsQuery
    },
    Mutation: {
        ...authMutation,
        ...eventsMutation,
        ...bookingsMutation
    }
};

module.exports = { resolvers };
