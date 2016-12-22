import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

import SimpleSchema from 'simpl-schema';

import './ajax.js';

export const Corps = new Mongo.Collection('corps');

const Schemas = Schemas || {};

Schemas.Corp = new SimpleSchema({
    corpID: {
        type: Number,
        label: 'Pilot ID',
        index: false,
        unique: false
    },
    corpName: {
        type: String,
        label: 'Pilot Name'
    },
    ownerID: {
        type: String,
        label: 'Owner ID'
    },
    ownerName: {
        type: String,
        label: 'Owner Name'
    },
    apiKeyID : {
        type: String,
        label: 'Api Key ID'
    },
    apiKeyVCode: {
        type: String,
        label: 'Api Key Owner'
    },
    lastScan: {
        type: Date,
        label: 'Last Scan'
    }
});

Corps.attachSchema(Schemas.Corp);

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish pilots that are public or belong to the current user
    Meteor.publish('corp', function corpsPublication() {
        return Corps.find({});
    });
}

Meteor.methods({

});
