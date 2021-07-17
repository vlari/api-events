import { model, Schema, Types } from 'mongoose';

export default interface Event {
    _id: Types.ObjectId,
    name: string,
    userId: string,
    organizer: string,
    description: string,
    date: Date,
    address: string,
    location: Location,
    tickets: object,
    tags: [string],
    imageUrl: string,
    liked: boolean
}

class Location {
    latitude: string;
    longitude: string;
    fullAddress: string;

    constructor(latitude: string, longitude: string, fullAddress: string) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.fullAddress = fullAddress;
    }
}

const eventSchema = new Schema({
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
},
{
    timestamps: true
});

export const EventModel = model<Event>('Event', eventSchema, 'events');