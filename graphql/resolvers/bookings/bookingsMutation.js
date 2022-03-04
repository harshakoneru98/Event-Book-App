const Event = require('../../../models/event');
const Booking = require('../../../models/booking');
const { transformBooking, transformEvent } = require('../merge');

module.exports = {
    bookEvent: async (parent, args) => {
        const fetchedEvent = await Event.findOne({ _id: args.eventId });
        const booking = new Booking({
            user: '6221c8c649ee287c90353f78',
            event: fetchedEvent
        });
        const result = await booking.save();
        return transformBooking(result);
    },
    cancelBooking: async (parent, args) => {
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
