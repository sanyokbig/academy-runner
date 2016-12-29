/**
 * Created by sanyokbig on 29.12.16.
 */

import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

import './corps.html';

import {Corps} from '../api/corps.js';

Template.corps.helpers({

});

Template.corps.events({
    'submit .new-corp'(e){
        e.preventDefault();
        console.log(e.target);
        Meteor.call('addCorp', e.target.id.value, e.target.vcode.value);
    },
});
