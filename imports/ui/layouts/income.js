import {Meteor} from 'meteor/meteor';
import {Templating} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict'

import './income.html';

import '../components/incoming.js';

import {Income} from '../../api/income/income.js';
import '../../api/income/methods.js';

Meteor.subscribe('income');

Template.income.onCreated(function(){
    this.state = new ReactiveDict();
    this.state.set('limit',100);
});

Template.income.helpers({
    'income'(){
        let selector = {},
            options = {
                limit: Template.instance().state.get('limit')
            };
        return Income.find(selector,options);
    }
});

Template.income.events({
    'click .more'(e,i){
        i.state.set('limit', i.state.get('limit')+100);
    }
})