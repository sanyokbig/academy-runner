import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import moment from 'moment';

import './pilot.html';

Template.pilot.helpers({
    momentDate(date, format) {
        return moment(date).format(format);
    }
});

Template.pilot.events({
    'click .remove'() {
        console.log(this);
	    Meteor.call('pilots.remove', this._id);
    }
});
