import {Meteor} from 'meteor/meteor';
import {Templating} from 'meteor/templating';

import './corps.html';

import '../components/corp.js';

import {Corps} from '../../api/corps/corps.js';
import '../../api/corps/methods.js';

Meteor.subscribe('corps');

Template.corps.helpers({
    'corps'(){
        return Corps.find();
    }
});

Template.corps.events({
    'submit .new-corp'(e){
        e.preventDefault();
        Meteor.call('corps.add',e.target.id.value,e.target.vcode.value,(err,res)=>{
            if(!err) {
                //console.log(res);
            }
        });
    }
})