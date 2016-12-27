import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {HTTP} from 'meteor/http';

import {Pilots} from './pilots.js';

Meteor.methods({
    'ajax.updatePilots'(id, vcode) {
        if (!Meteor.isServer)
            return;
        check(id, String);
        check(vcode, String);

        HTTP.get('https://api.eveonline.com/corp/MemberTracking.xml.aspx', {
            params: {
                extended: true,
                keyID: id,
                vCode: vcode
            }
        }, function (error, response) {
            let xml = xml2js.parseStringSync(response.content);
            let pilots = xml.eveapi.result[0].rowset[0].row;
            for (let i = 0; i < pilots.length; i++) {
                let pilot = pilots[i].$,
                    entry = Pilots.findOne({pilotID: +pilot.characterID});
                if (entry) {
                    Pilots.update({
                        pilotID: pilot.charactedID
                    }, {
                        $set: {
                            location: pilot.location ? pilot.location : 'Неизвестно',
                            shiptype: pilot.shipType,
                            joined: pilot.startDateTime,
                            logon: pilot.logonDateTime,
                            logoff: pilot.logoffDateTime
                        }
                    })
                } else {
                    Pilots.insert({
                        pilotID: +pilot.characterID,
                        pilotName: pilot.name,
                        mainID: pilot.characterID,
                        mainName: pilot.name,
                        corpID: 1,
                        corpName: 'Corp Name 1',
                        joined: pilot.startDateTime,
                        logon: pilot.logonDateTime,
                        logoff: pilot.logoffDateTime,
                        location: pilot.location ? pilot.location : 'Неизвестно',
                        shiptype: pilot.shipType,
                        kills: 0,
                        losses: 0,
                        klratio: 0,
                        points: 0,
                        income: 0
                    }, (error, result) => {
                        if (error) {
                            console.log(error);
                        }
                    });
                }
            }
        });
    },
    'collection.drop'() {
        Pilots.remove({});
    }
});
