import {Templating} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

import './pilot.html';



Template.pilot.helpers({

});

Template.pilot.events({
    'click .remove'(){
        Meteor.call('pilots.remove',this._id);
    }
})