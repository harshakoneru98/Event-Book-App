let events = [];

const resolvers = {
    Query: {
        // Event Resolvers
        events: () => {
            return events;
        }
    },
    Mutation: {
        createEvent: (parent, args) => {
            console.log(args);
            const event = {
                _id: Math.random().toString(),
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date
            };
            events.push(event);
            return event;
        }
    }
};

module.exports = { resolvers };
