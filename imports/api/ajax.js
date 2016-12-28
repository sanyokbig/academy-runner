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
    },
    'eve.getToken'(queryParams){
        let client_id='89ed2b258e4f4b95a4b49ac918648547',
            secret='Dn1FzdozW4d79cuiLD5tE34jeopjON36ShoYyIQw';
        HTTP.post('https://login.eveonline.com/oauth/token',{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            auth: client_id+':'+secret,
            params: {
                grant_type:'authorization_code',
                code: queryParams.code
            }
        }, function(error, response){
            if(error) {
                console.log(error)
            } else {
                let data = response.data;
                Meteor.call('eve.getCharacter',data.access_token,data.refresh_token,data.expires_in);
            }
        });
    },
    'eve.getCharacter'(access_token,refresh_token,expires_in){
        HTTP.get('https://login.eveonline.com/oauth/verify',{
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }, function(error, response){
            if(error) {
                console.log(error)
            } else {
                content = JSON.parse(response.content);
                let user = Meteor.users.findOne({name: content.CharacterName});
                let doc = {
                        name: content.CharacterName,
                        access_token,
                        refresh_token,
                        expires_in
                };
                if(user) {
                    Meteor.users.update({
                        name: content.CharacterName
                    },{$set: doc});
                } else {
                    Meteor.users.insert(doc);
                }
            }
        })
    }
});
