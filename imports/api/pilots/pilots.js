import {Mongo} from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';

export const Pilots = new Mongo.Collection('pilots');

const Schemas = Schemas || {};

Schemas.Pilot = new SimpleSchema({
    pilotID: {
        type: Number,
        label: 'Pilot ID'
    },
    pilotName: {
        type: String,
        label: 'Pilot Name'
    },
    mainID: {
        type: Number,
        label: 'Main ID'
    },
    corpID : {
        type: Number,
        label: 'Corp ID'
    },
    joined: {
        type: Date,
        label: 'Joined Date'
    },
    logon: {
        type: Date,
        label: 'Logon Date'
    },
    logoff: {
        type: Date,
        label: 'Logoff Date'
    },
    location: {
        type: String,
        label: 'Location'
    },
    shiptype: {
        type: String,
        label: 'Shiptype'
    },
    kills: {
        type: Number,
        label: 'Kills'
    },
    losses: {
        type: Number,
        label: 'Losses'
    },
    klratio: {
        type: Number,
        label: 'K/L Ratio'
    },
    points: {
        type: String,
        label: 'Points'
    },
    income: {
        type: String,
        label: 'Income'
    },

});

Pilots.attachSchema(Schemas.Pilot);