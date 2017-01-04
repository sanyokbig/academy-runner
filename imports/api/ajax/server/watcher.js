import {Corps} from '../../corps/corps.js';

Meteor.startup(()=>{
    Meteor.call('corps.update-all');
    Meteor.setInterval(()=>{
        Meteor.call('corps.update-all');
    },5000);
})