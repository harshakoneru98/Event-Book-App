const Booking = require('../../../models/booking');
const { transformBooking } = require('../merge');

module.exports = {
    bookings: async (parent, args, context) => {
        if (!context.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const bookings = await Booking.find({ user: context.userId });
            return bookings.map((booking) => {
                return transformBooking(booking);
            });
        } catch (err) {
            throw err;
        }
    }
};
