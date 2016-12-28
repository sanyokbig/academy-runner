/**
 * Created by sanyokbig on 23.12.16.
 */

import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

import './login.html';

Template.login.events({
    'click .login'(e){
        e.preventDefault();
        let uri = 'https://login.eveonline.com/oauth/authorize/',
            response_type = '?response_type=code',
            redirect_uri = '&redirect_uri=http://localhost:3000/oauth',
            client_id = '&client_id=89ed2b258e4f4b95a4b49ac918648547',
            scope = '&scope=publicData',
            state = '&state=uniqueState123';
        let url=uri+response_type+redirect_uri+client_id+scope+state;
        window.open(url, 'eve-login2', 'width=600,height=600');
    }
});
