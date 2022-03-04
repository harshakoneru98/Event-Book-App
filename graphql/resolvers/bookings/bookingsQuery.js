const Booking = require('../../../models/booking');
const { transformBooking } = require('../merge');

module.exports = {
    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map((booking) => {
                return transformBooking(booking);
            });
        } catch (err) {
            throw err;
        }
    }
};
