import {Meteor} from 'meteor/meteor';

import { Income } from './income.js';
import { Ajax } from '../ajax/methods.js';
import { Corps } from '../corps/corps.js';

Meteor.methods({
    'income.import'(corpID) {
        if(!this.isSimulation) {
            let corp = Corps.findOne({
                corpID: +corpID
            });
            if(!corp) {
                throw new Meteor.Error('Corp not found!');
            }
            let keyID = corp.keyID,
                vCode = corp.vCode;
            return Ajax.getIncome(keyID, vCode)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    console.log(error);
                    throw new Meteor.Error(error);
                });
        }
    },
    'income.remove'(id){
        if(!Meteor.user()){
            throw new Meteor.Error('not-authorized');
        }
        Income.remove({_id: id});
    },
    'income.drop'(corpID){
        Income.remove({corpID});
    }
});
