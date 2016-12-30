/**
 * Created by sanyokbig on 29.12.16.
 */

import {Meteor} from 'meteor/meteor';
import {Corps} from '../corps.js';

Meteor.publish('corps', function corpsPublication() {
    if(this.userId) {
        return Corps.find({
            owner: Meteor.users.findOne(this.userId).services.eve.character.id
        });
    }
});