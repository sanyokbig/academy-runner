/**
 * Created by sanyokbig on 29.12.16.
 */

import {Meteor} from 'meteor/meteor';
import {Corps} from '../corps.js';

Meteor.publish('corps', function corpsPublication() {
    return Corps.find({owner: Meteor.userId()});
});