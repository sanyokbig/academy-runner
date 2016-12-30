import {Mongo} from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';

export const Corps = new Mongo.Collection('corps');

const Schemas = Schemas || {};

Schemas.Corp = new SimpleSchema({
    corpID: {
        type: Number,
        label: 'Corporation ID'
    },
    corpName: {
        type: String,
        label: 'Corporation Name'
    },
    owner: {
        type: Number,
        label: 'Owner ID'
    },
    keyID : {
        type: String,
        label: 'Api Key ID'
    },
    vCode: {
        type: String,
        label: 'Api Key VCode'
    },
    lastScan: {
        type: Date,
        label: 'Last Scan'
    }
});

Corps.attachSchema(Schemas.Corp);