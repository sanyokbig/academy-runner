import {Meteor} from 'meteor/meteor';

import { Pilots } from './pilots.js';
import { Corps } from '../corps/corps.js';
import { Ajax } from '../ajax/methods.js';

Meteor.methods({
    'pilots.import'(corpID) {
        if(!this.isSimulation) {
            let corp = Corps.findOne({
                corpID: +corpID
            });
            if(!corp) {
                throw new Meteor.Error('Corp not found!');
            }
            let keyID = corp.keyID,
                vCode = corp.vCode;
            return Ajax.getPilots(keyID, vCode)
                .then(response => {
                    response = response.eveapi.result[0].rowset[0].row;
                    let ex=nex=0;
                    for (let pilot of response) {
                        pilot=pilot.$;
                        let old_pilot = Pilots.findOne({
                            pilotID: +pilot.characterID
                        });
                        if (old_pilot) {
                            Pilots.update(old_pilot._id,{
                                $set: {
                                    corpID: +corpID,
                                    joined: new Date(pilot.startDateTime),
                                    logon: new Date(pilot.logonDateTime),
                                    logoff: new Date(pilot.logoffDateTime),
                                    location: pilot.location || 'FUCK CCP',
                                    shiptype: pilot.shipType
                                }
                            });
                            ex++;
                        } else {
                            Pilots.insert({
                                pilotID: +pilot.characterID,
                                pilotName: pilot.name,
                                mainID: +pilot.characterID,
                                corpID: +corpID,
                                joined: new Date(pilot.startDateTime),
                                logon: new Date(pilot.logonDateTime),
                                logoff: new Date(pilot.logoffDateTime),
                                location: pilot.location || 'FUCK CCP',
                                shiptype: pilot.shipType,
                                kills: 0,
                                losses: 0,
                                klratio: 0,
                                points: 0,
                                income: 0
                            });
                            nex++;
                        }
                    }
                    //console.log(ex,nex);
                    return response;
                })
                .catch(error => {
                    console.log(error);
                    throw new Meteor.Error(error);
                });
        }
    },
    'pilots.remove'(id){
        if(!Meteor.user()){
            throw new Meteor.Error('not-authorized');
        }
        Pilots.remove({_id: id});
    },
    'pilots.drop'(corpID){
        Pilots.remove({corpID});
    }
});
