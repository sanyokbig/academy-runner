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
        let curCorp = +Session.get('current-corp'),
            selector = {};
        if(curCorp) {
            selector.corpID = curCorp;
        }
        return Pilots.find(selector);
    }
});

Template.pilots.events({

});