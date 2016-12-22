import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './pilot.html';

Template.pilot.helpers({
    isOwner() {
	return this.owner === Meteor.userId();
    },
});

Template.pilot.events({
    'click .toggle-checked'() {
	// Set the checked property to the opposite of its current value
	Meteor.call('pilots.setChecked', this._id, !this.checked);
    },
    'click .delete'() {
	Meteor.call('pilots.remove', this._id);
    },
    'click .toggle-private'() {
	Meteor.call('pilots.setPrivate', this._id, !this.private);
    },
});
