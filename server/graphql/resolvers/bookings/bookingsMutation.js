const Event = require('../../../models/event');
const Booking = require('../../../models/booking');
const { transformBooking, transformEvent } = require('../merge');

module.exports = {
    bookEvent: async (parent, args, context) => {
        if (!context.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const fetchedEvent = await Event.findOne({ _id: args.eventId });
        const booking = new Booking({
            user: context.userId,
            event: fetchedEvent
        });
        const result = await booking.save();
        return transformBooking(result);
    },
    cancelBooking: async (parent, args, context) => {
        if (!context.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const booking = await Booking.findById(args.bookingId).populate(
                'event'
            );
            const event = transformEvent(booking.event);
            await Booking.deleteOne({ _id: args.bookingId });
            return event;
        } catch (err) {
            throw err;
        }
    }
};
