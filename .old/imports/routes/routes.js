/**
 * Created by sanyokbig on 27.12.16.
 */

import {Meteor} from 'meteor/meteor';
import '../api/ajax.js';

FlowRouter.route('/',{
    name:'home'
})

FlowRouter.route('/oauth', {
    name: 'Lists.show',
    action(params, queryParams) {
        Meteor.call('eve.getToken', queryParams, function(){close()});
    }
});