var mongoose    = require('mongoose');

var DevicesSchema = mongoose.Schema({
    local: {
        device_id: String,
        device_location: {
            type: [Number],
            index: {
                type: '2dsphere',
                sparse: true
            }
        },
        battery: Number,
        visitor_estimate: Number
    }
});

module.exports = mongoose.model ("Devices", DevicesSchema);