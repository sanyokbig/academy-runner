import {Meteor} from 'meteor/meteor';

import { Corps } from './corps.js';
import { Ajax } from '../ajax/methods.js';

Meteor.methods({
    'corps.add'(keyID,vCode) {
        if(!Meteor.user()){
            throw new Meteor.Error('not-authorized');
        }
        if(!Meteor.isServer) {
            return;
        }
        return Ajax.getApiInfo(keyID,vCode)
            .then(response => {
                response = response.eveapi.result[0].key[0];
                let keyInfo = response.$,
                    charInfo = response.rowset[0].row[0].$;

                let corp = Corps.findOne({
                    corpID: +charInfo.corporationID
                });
                if(!corp) {
                    Corps.insert({
                        corpID: charInfo.corporationID,
                        corpName: charInfo.corporationName,
                        owner: Meteor.user().services.eve.character.id,
                        keyID,
                        vCode,
                        lastScan: new Date(),
                    })
                } else {
                    throw new Meteor.Error('corp-exists');
                }

                return response;
            })
            .catch(error=>{
                console.log(error);
                throw new Meteor.Error(error);
            });
    },
    'corps.remove'(corpid){
        Corps.remove(corpId);
    }
});
