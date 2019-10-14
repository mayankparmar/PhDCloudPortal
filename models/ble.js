var mongoose    = require('mongoose');

var ThermalSchema = mongoose.Schema({
    local: {
        device_id: String,
        uuid: Number,
        device_type: String,
        manufacturer: String,
        timestamp: {type: Date,
        default: Date.now()}
    }
});

module.exports = mongoose.model ("Devices", DevicesSchema);