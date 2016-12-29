/**
 * Created by sanyokbig on 29.12.16.
 */

import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/',{
    triggersEnter: [function(context, redirect){
        redirect('/home');
    }]
});

FlowRouter.route('/home',{
    action: ()=>{
        BlazeLayout.render('MainLayout', {top: 'header', main: 'home'})
    }
});

FlowRouter.route('/pilots',{
    action: ()=>{
        BlazeLayout.render('MainLayout', {top: 'header', main: 'pilots'})
    }
});

FlowRouter.route('/corps',{
    action: ()=>{
        BlazeLayout.render('MainLayout', {top: 'header', main: 'corps'})
    }
});