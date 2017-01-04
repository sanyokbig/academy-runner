import {Meteor} from 'meteor/meteor';
import {Templating} from 'meteor/templating';
import {Session} from 'meteor/session';

import './pilots.html';

import '../components/pilot.js';

import {Pilots} from '../../api/pilots/pilots.js';
import '../../api/pilots/methods.js';

Meteor.subscribe('pilots');

Template.pilots.helpers({
    'pilots'(){
        return Pilots.find({corpID: +Session.get('current-corp')});
    }
});

Template.pilots.events({
    'click .refresh'(){
        Meteor.call('pilots.import',$('#corp-select').val());
    }
})