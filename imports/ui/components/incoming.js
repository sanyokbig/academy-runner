import {Templating} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

import './incoming.html';

Template.incoming.events({
    'click .remove'(){
        Meteor.call('income.remove',this._id);
    }
})