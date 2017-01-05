import {Meteor} from 'meteor/meteor';
import {Templating} from 'meteor/templating';
import {Session} from 'meteor/session';

import './header.html';

import {Corps} from '../../api/corps/corps.js';
import '../../api/corps/methods.js';

Meteor.subscribe('corps');

Template.header.helpers({
    'corps'(){
        return Corps.find();
    }
});
Template.header.events({
    'click .login'(){
        Meteor.loginWithEve({
            requestPermissions: ['publicData']
        }, (err) => {
            if (err) {
                console.log(err);
            }
        });
    },
    'click .logoff'(){
        Meteor.logout();
    },
    'change select'(e){
        Session.set('current-corp',$(e.target).val());
    }
});
Template.header.onRendered(()=>{
    Session.set('current-corp',$('.corp-select select').val());
});