import {Templating} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

import './corp.html';

Template.corp.events({
    'click .remove'(){
        Meteor.call('corps.remove',this._id);
    }
})