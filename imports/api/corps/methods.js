import {Meteor} from 'meteor/meteor';

import { Corps } from './corps.js';

Meteor.methods({
    'corps.add'(keyID,vCode) {
        if(!Meteor.user()){
            console.log('login first');
            return;
        }
        Meteor.call('ajax.getApiInfo',keyID, vCode,(err,res)=>{
            console.log(Meteor.user());
            console.log('123');
            // Corps.insert({
            //     corpId: 123,
            //     corpName:'textcorp',
            //     owner: Meteor.userId(),
            //     keyID: '123',
            //     vCode: '123123',
            //     lastScan: new Date()
            // });
        });

    },
    'corps.remove'(corpid){
        Corps.remove(corpId);
    }
});
