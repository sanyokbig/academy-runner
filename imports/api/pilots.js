import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import SimpleSchema from 'simpl-schema';

import './ajax.js';

export const Pilots = new Mongo.Collection('pilots');

const Schemas = {};

Schemas.Pilot = new SimpleSchema({
    pilotId: {
	type: Number,
	label: 'Pilot Id',
	index: true,
	unique: true
    },
    pilotName: {
	type: String,
	label: 'Pilot Name'
    },
    location: {
	type: String,
	label: 'Location'
    },
    shipType: {
	type: String,
	label: 'Ship Type'
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
	return Pilots.find({
	    $or: [
		{private: {$ne: true}},
		{owner: this.userId},
	    ],
	});
    });
}

Meteor.methods({
    'pilots.insert'(text) {
	check(text, String);

	// Make sure the user is logged in before inserting a pilot
	if (!this.userId) {
	    throw new Meteor.Error('not-authorized');
	}

	Pilots.insert({
	    text,
	    createdAt: new Date(),
	    owner: this.userId,
	    username: Meteor.users.findOne(this.userId).username,
	});
    },
    'pilots.remove'(pilotId) {
	check(pilotId, String);

	const pilot = Pilots.findOne(pilotId);
	if (pilot.private && pilot.owner !== this.userId) {
	    // If the pilot is private, make sure only the owner can delete it
	    throw new Meteor.Error('not-authorized');
	}

	Pilots.remove(pilotId);
    },
    'pilots.setChecked'(pilotId, setChecked) {
	check(pilotId, String);
	check(setChecked, Boolean);

	const pilot = Pilots.findOne(pilotId);
	if (pilot.private && pilot.owner !== this.userId) {
	    // If the pilot is private, make sure only the owner can check it off
	    throw new Meteor.Error('not-authorized');
	}

	Pilots.update(pilotId, {$set: {checked: setChecked}});
    },
    'pilots.setPrivate'(pilotId, setToPrivate) {
	check(pilotId, String);
	check(setToPrivate, Boolean);

	const pilot = Pilots.findOne(pilotId);

	// Make sure only the pilot owner can make a pilot private
	if (pilot.owner !== this.userId) {
	    throw new Meteor.Error('not-authorized');
	}

	Pilots.update(pilotId, {$set: {private: setToPrivate}});
    },
    'pilots.drop'() {
	Pilots.drop();
    },
    'pilots.sort'() {
	
    }
});
