const Event = require('../../../models/event');
const { transformEvent } = require('../merge');

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map((event) => {
                return transformEvent(event);
            });
        } catch (err) {
            throw err;
        }
    }
};
