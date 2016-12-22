import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
//import { ReactiveDict } from 'meteor/reactive-dict';

import { Pilots } from '../api/pilots.js';

import './pilotsGrid.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('pilots');
});

Template.body.helpers({
    incompleteCount() {
	return Pilots.find({checked: {$ne: true}}).count();
    },
});

Template.body.events({
    
});
