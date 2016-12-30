import {Meteor} from 'meteor/meteor';
import {Templating} from 'meteor/templating';

import './navbar.html';

Template.navbar.events({
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
    }
});