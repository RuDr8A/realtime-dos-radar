
const mongoose = require('mongoose');

const attackSchema = new mongoose.Schema({
    sourceLat: { type: Number, required: true },
    sourceLng: { type: Number, required: true },
    targetLat: { type: Number, required: true },
    targetLng: { type: Number, required: true },
    threatLevel: { 
        type: String, 
        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], 
        required: true 
    },
    timestamp: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('Attack', attackSchema);