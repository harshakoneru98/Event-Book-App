const bcrypt = require('bcryptjs');
const Event = require('../../models/event');
const User = require('../../models/user');

const events = async (eventIds) => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } });
        events.map((event) => {
            return {
                ...event._doc,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, event.creator)
            };
        });
        return events;
    } catch (err) {
        throw err;
    }
};

const user = async (userId) => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            createdEvents: events.bind(this, user._doc.createdEvents)
        };
    } catch (err) {
        throw err;
    }
};

const resolvers = {
    Query: {
        // Event Resolvers
        events: async () => {
            try {
                const events = await Event.find();
                return events.map((event) => {
                    return {
                        ...event._doc,
                        date: new Date(event._doc.date).toISOString(),
                        creator: user.bind(this, event._doc.creator)
                    };
                });
            } catch (err) {
                throw err;
            }
        }
    },
    Mutation: {
        createEvent: async (parent, args) => {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date),
                creator: '6221c8c649ee287c90353f78'
            });
            let createdEvent;
            try {
                const result = await event.save();
                createdEvent = {
                    ...result._doc,
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, result._doc.creator)
                };
                const creator = await User.findById('6221c8c649ee287c90353f78');

                if (!creator) {
                    throw new Error('User not found.');
                }
                creator.createdEvents.push(event);
                await creator.save();

                return createdEvent;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        createUser: async (parent, args) => {
            try {
                const existingUser = await User.findOne({
                    email: args.userInput.email
                });
                if (existingUser) {
                    throw new Error('User exists already.');
                }
                const hashedPassword = await bcrypt.hash(
                    args.userInput.password,
                    12
                );

                const user = new User({
                    email: args.userInput.email,
                    password: hashedPassword
                });

                const result = await user.save();

                return { ...result._doc, password: null };
            } catch (err) {
                throw err;
            }
        }
    }
};

module.exports = { resolvers };
