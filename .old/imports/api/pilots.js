import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

import SimpleSchema from 'simpl-schema';

import './ajax.js';

export const Pilots = new Mongo.Collection('pilots');

const Schemas = Schemas || {};

Schemas.Pilot = new SimpleSchema({
    pilotID: {
        type: Number,
        label: 'Pilot Id',
        index: true,
        unique: true
    },
    pilotName: {
        type: String,
        label: 'Pilot Name'
    },
    mainID: {
        type: Number,
        label: 'Main Id'
    },
    mainName: {
        type: String,
        label: 'Main Name'
    },
    corpID: {
        type: Number,
        label: 'Corp Id'
    },
    corpName: {
        type: String,
        label: 'Corp Name'
    },
    joined: {
        type: Date,
        label: 'Joined'
    },
    logon: {
        type: Date,
        label: 'Last Logon'
    },
    logoff: {
        type: Date,
        label: 'Last Logoff'
    },
    location: {
        type: String,
        label: 'Location'
    },
    shiptype: {
        type: String,
        label: 'Ship Type'
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
        label: 'Kill/Loss Ratio'
    },
    points: {
        type: Number,
        label: 'Points'
    },
    income: {
        type: Number,
        label: 'Income'
    }
});

Pilots.attachSchema(Schemas.Pilot);

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish pilots that are public or belong to the current user
    Meteor.publish('pilots', function pilotsPublication() {
        return Pilots.find({});
    });
}

Meteor.methods({
    'pilots.remove'(pilotID) {
        check(pilotID, String);
        console.log(pilotID);
        const pilot = Pilots.findOne(pilotID);
        if (!this.userId) {
            // If the pilot is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Pilots.remove(pilotID);
    },
    'pilots.drop'() {
        Pilots.drop();
    },
    'pilots.sort'() {

    }
});
