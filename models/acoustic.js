var mongoose    = require('mongoose');

var ThermalSchema = mongoose.Schema({
    local: {
        device_id: String,
        uuid: Number,
        direction_of_arrival: Number,
        direction_of_departure: Number,
        acoustic_signature: Number,
        timestamp: {type: Date,
        default: Date.now()}
    }
});

module.exports = mongoose.model ("Devices", DevicesSchema);