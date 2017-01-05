import {Mongo} from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';

export const Income = new Mongo.Collection('income');

const Schemas = Schemas || {};

Schemas.Incoming = new SimpleSchema({
    refID: {
        type: Number,
        label: 'Reference ID'
    },
    pilotID: {
        type: Number,
        label: 'Pilot ID'
    },
    amount: {
        type: Number,
        label: 'Amount'
    },
    date: {
        type: Date,
        label: 'Date'
    }
});

Income.attachSchema(Schemas.Incoming);