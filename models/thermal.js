var mongoose    = require('mongoose');

var ThermalSchema = mongoose.Schema({
    local: {
        device_id: String,
        uuid: Number,
        group_size: Number,
        heat_signature: Number,
        timestamp: {type: Date,
        default: Date.now()}
    }
});

module.exports = mongoose.model ("Devices", DevicesSchema);