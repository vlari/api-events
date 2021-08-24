"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = void 0;
const mongoose_1 = require("mongoose");
class Location {
    constructor(latitude, longitude, fullAddress) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.fullAddress = fullAddress;
    }
}
const eventSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please add an event name']
    },
    userId: String,
    organizer: {
        name: {
            type: String,
            required: [true, 'Please add the name of the organizer']
        },
        website: String
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        minlength: 50,
        maxlength: 300
    },
    date: {
        type: Date,
        required: [true, 'Please add a date']
    },
    address: {
        type: String,
        required: [true, 'Please add an address'],
        maxlength: 50
    },
    location: {
        latitude: {
            type: String
        },
        longitude: {
            type: String
        },
        fullAddress: String,
    },
    tickets: {},
    tags: [String],
    imageUrl: {
        type: String,
        required: [true, 'Please add image url']
    },
    liked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
exports.EventModel = mongoose_1.model('Event', eventSchema, 'events');
