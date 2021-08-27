import { model, Schema, Types, SchemaTypes } from 'mongoose';

export default interface Order {
    _id: Types.ObjectId,
    event: Event,
    payment: Payment,
    user: User,
    quantity: number,
    price: number
}

const orderSchema = new Schema({
    event: {
        name: String,
        organizer: String,
        date: Date,
        address: String,
        ticket: String
    },
    payment: {
        cardNumber: String,
        csc: String,
        postal: String,
        expirationDate: String
    },
    user: {
        userId: {
            type: String,
            select: false
        },
        name: String,
        email: {
            type: String,
            match: [/^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/,
            'Please enter a valid email']
        }
    },
    quantity: Number,
    price: SchemaTypes.Decimal128
},
{
    timestamps: true
});

export const OrderModel = model<Order>('Order', orderSchema, 'orders');

class Event {
  name: string;
  organizer: string;
  date: Date;
  address: string;
  ticket: string;

  constructor(name: string, organizer: string, date: Date, address: string, ticket: string) {
      this.name = name;
      this.organizer = organizer;
      this.date = date;
      this.address = address;
      this.ticket = ticket;
  }
}

class Payment {
    cardNumber: string;
    csc: string;
    postal: string;
    expiratonDate: string;
  
    constructor(cardNumber: string, csc: string, postal: string, expirationDate: string) {
        this.cardNumber = cardNumber;
        this.csc = csc;
        this.postal = postal;
        this.expiratonDate = expirationDate;
    }
  }

  class User {
    userId: string;
    name: string;
    email: string;
  
    constructor(userId: string, name: string, email: string) {
        this.userId = userId;
        this.name = name;
        this.email = email;
    }
  }
