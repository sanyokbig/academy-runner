import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

import {Pilots} from '../api/pilots.js';

import './pilotsGrid.html';
import './pilot.js';

Template.pilotsGrid.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('pilots');
});

Template.pilotsGrid.helpers({
    pilots() {
        const instance = Template.instance();
        if (instance.state.get('hideCompleted')) {
            // If hide completed is checked, filter pilots
            return Pilots.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
        }
        // Otherwise, return all of the pilots
        return Pilots.find({}, {sort: {createdAt: -1}});
    },
    pilotsCount() {
        return Pilots.find({checked: {$ne: true}}).count();
    },
});

Template.pilotsGrid.events({
    'click .read'(event, instance) {
        Meteor.call('ajax.updatePilots', '5629956', '2R1BGtO434Z9ygT0WbnHBa6Sly6l7wYkLZoGvg0iEhGuAbdrtWl4phvfHN9NYNvv')
    },
    'click .drop'(event, instance) {
        Meteor.call('collection.drop')
    },
    'click .grid-sorter'(event, instance) {
        Meteor.call('pilots.sort');
    }
});