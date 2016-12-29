/**
 * Created by sanyokbig on 29.12.16.
 */

import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/main.html'

import '../../ui/layouts/navbar.js'

import '../../ui/layouts/pilots.html'
import '../../ui/layouts/corps.js'
import '../../ui/layouts/kills.html'
import '../../ui/layouts/income.html'

FlowRouter.route('/',{
    name: 'main',
    action: ()=>{
        BlazeLayout.render('main',{main: 'home'})
    }
});

FlowRouter.route('/pilots',{
    name:'pilots',
    action: ()=>{
        BlazeLayout.render('main', {main: 'pilots'})
    }
});

FlowRouter.route('/corps',{
    name: 'corps',
    action: ()=>{
        BlazeLayout.render('main', {main: 'corps'})
    }
});

FlowRouter.route('/kills',{
    name: 'kills',
    action: ()=>{
        BlazeLayout.render('main', {main: 'kills'})
    }
});

FlowRouter.route('/income',{
    name: 'income',
    action: ()=>{
        BlazeLayout.render('main', {main: 'income'})
    }
});
