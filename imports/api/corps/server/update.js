import {Meteor} from 'meteor/meteor';

import {Corps} from '../corps.js';
import { Ajax } from '../../ajax/methods.js';

const API_MASK = 33554432;

Meteor.methods({
    'corps.update-all'(){
        Corps.find().forEach((corp)=>{
            let corpID=corp.corpID,
                keyID=corp.keyID,
                vCode=corp.vCode;
            Meteor.call('corps.api-check', keyID, vCode);
            Meteor.call('pilots.import', corpID);
        });
    },
    'corps.api-check'(keyID, vCode){
        return Ajax.getKeyInfo(keyID, vCode)
            .then(response => {
                response = response.eveapi.result[0].key[0];
                let keyInfo = response.$,
                    charInfo = response.rowset[0].row[0].$;
                let corp = Corps.findOne({
                    corpID: +charInfo.corporationID
                });
                if (corp) {
                    let update={
                        lastScan: new Date()
                    };
                    if(keyInfo.mask & API_MASK != API_MASK) {
                        update.keyValid = false;
                    }

                    Corps.update(corp._id,{$set:update});
                }

                return response;
            })
            .catch(error => {
                console.log(error);
                throw new Meteor.Error(error);
            });
    }
});

